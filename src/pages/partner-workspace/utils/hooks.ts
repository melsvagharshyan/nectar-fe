import { useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetPropertiesFeedInfiniteQuery } from "../../../api/properties-api-ts/propertiesApi";
import {
  useGetRequestQuery,
  useGetRequestsInfiniteQuery,
} from "../../../api/requests-api-ts/requestsApi";
import { useDemo, useScopedState } from "../../../app/DemoProvider";
import { navigate, useRoute } from "../../../app/router";
import { toPartnerView } from "../../../demo/projections";
import { sliceOf } from "../../../demo/scope";
import type { Actor } from "../../../demo/types";
import { currentCompanyId } from "../../../utils/helpers";
import { useFilterForm } from "../../../utils/hooks";
import { notify, UNDO_LABEL } from "../../../components/toaster";
import {
  DEFAULT_PARTNER_FILTERS,
  DRAFT_TOASTS,
  REQUEST_FILTER_PARAM,
  RESET_PARTNER_FILTERS,
} from "./constants";
import { isOpenForOffers } from "./helpers";
import type { PartnerRequest, PropertyBaseView } from "./types";

const itemsOf = <T,>(pages: { items: T[] }[] | undefined) =>
  pages?.flatMap((p) => p.items) ?? [];

export function usePartnerWorkspace() {
  const [, dispatch] = useDemo();
  const route = useRoute();
  const actor: Actor = {
    role: "partner",
    companyId: currentCompanyId(),
  };
  const filterForm = useFilterForm(DEFAULT_PARTNER_FILTERS);
  const [matching, setMatching] = useState(false);
  const [step, setStep] = useState(0);
  const [view, setView] = useState<PropertyBaseView>("grid");

  const { search, filter } = filterForm.values;
  const requestsQuery = useGetRequestsInfiniteQuery({
    search,
    filter: REQUEST_FILTER_PARAM[filter],
  });
  const requestedId = route.params.get("request") || undefined;
  const requested = useGetRequestQuery(requestedId ?? skipToken);
  const pageIds = itemsOf(requestsQuery.data?.pages).map((r) => r.id);
  const activeId = pageIds.find((id) => id === requestedId) ?? pageIds[0];
  const detail = useGetRequestQuery(activeId ?? skipToken);
  const feed = useGetPropertiesFeedInfiniteQuery(
    matching && !activeId
      ? skipToken
      : { status: "active", matchRequest: matching ? activeId : undefined },
  );
  const feedPages = feed.data?.pages;
  const feedSlice = useMemo(
    () => ({
      properties: itemsOf(feedPages),
      offers: feedPages?.flatMap((p) => p.offers) ?? [],
    }),
    [feedPages],
  );

  const state = useScopedState([
    ...sliceOf(requestsQuery.data?.pages),
    requested.data,
    detail.data,
    feedSlice,
  ]);
  const data = toPartnerView(state, currentCompanyId());
  const requests = pageIds
    .map((id) => data.requests.find((r) => r.id === id))
    .filter((r): r is PartnerRequest => !!r);
  const request = requests.find((r) => r.id === activeId);
  const draft = request ? data.drafts[request.id] || [] : [];
  const toggleDraft = async (propertyId: string, undoable = true) => {
    if (!request) return;
    const wasInDraft = draft.includes(propertyId);
    const { error } = await dispatch({
      type: "DRAFT_TOGGLE",
      actor,
      requestId: request.id,
      propertyId,
    });
    if (error || !undoable) return;
    const toast = wasInDraft ? DRAFT_TOASTS.removed : DRAFT_TOASTS.added;
    notify.success(toast.title, {
      description: toast.description,
      action: { label: UNDO_LABEL, onClick: () => void toggleDraft(propertyId, false) },
    });
  };

  return {
    data,
    unavailable: !!requestedId && requested.isError,
    requestsPaging: {
      total: requestsQuery.data?.pages[0]?.total ?? pageIds.length,
      loading: requestsQuery.isFetching && !requestsQuery.isFetchingNextPage,
      loadingMore: requestsQuery.isFetchingNextPage,
      hasMore: requestsQuery.hasNextPage,
      loadMore: () => void requestsQuery.fetchNextPage(),
    },
    propertiesPaging: {
      loading: feed.isFetching && !feed.isFetchingNextPage,
      loadingMore: feed.isFetchingNextPage,
      hasMore: feed.hasNextPage,
      loadMore: () => void feed.fetchNextPage(),
    },
    filterForm,
    resetFilters: () => filterForm.reset(RESET_PARTNER_FILTERS),
    matching,
    setMatching,
    step,
    setStep,
    view,
    setView,
    requests,
    request,
    draft,
    properties: feedSlice.properties,
    locked: !isOpenForOffers(request),
    toggleDraft,
    isOffered: (propertyId: string) =>
      data.offers.some(
        (o) => o.requestId === request?.id && o.propertyId === propertyId,
      ),
    selectRequest: (requestId: string) => {
      navigate("/partner/requests", { request: requestId });
      setStep(1);
    },
  };
}

export type PartnerWorkspaceModel = ReturnType<typeof usePartnerWorkspace>;
