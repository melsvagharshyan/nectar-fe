import { useEffect, useRef, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetClientQuery,
  useGetClientsInfiniteQuery,
} from "../../../api/clients-api-ts/clientsApi";
import {
  useGetRequestQuery,
  useGetRequestsInfiniteQuery,
} from "../../../api/requests-api-ts/requestsApi";
import { useDemo, useScopedState } from "../../../app/DemoProvider";
import { sliceOf } from "../../../demo/scope";
import { navigate, useRoute } from "../../../app/router";
import { toBrokerView } from "../../../demo/projections";
import {
  activeTransfer,
  isRequestEditable,
  selectedOffers,
} from "../../../demo/selectors";
import { notify, UNDO_LABEL } from "../../../components/toaster";
import type { Actor, Offer } from "../../../demo/types";
import { brokerCompanyIdFor } from "../../../utils/helpers";
import { useFilterForm } from "../../../utils/hooks";
import {
  DEFAULT_OFFER_FILTERS,
  EMPTY_CLIENT_FILTERS,
  OFFER_TOASTS,
} from "./constants";
import { offerTabCounts, visibleOffers } from "./helpers";
import type { OfferTab } from "./types";

const itemsOf = <T,>(pages: { items: T[] }[] | undefined) =>
  pages?.flatMap((p) => p.items) ?? [];

export function useWorkspace(admin: boolean) {
  const [base, dispatch] = useDemo();
  const route = useRoute();
  const company =
    (admin && route.params.get("company")) || brokerCompanyIdFor(base);
  const actor: Actor = { role: admin ? "admin" : "broker", companyId: company };

  const clientForm = useFilterForm({
    ...EMPTY_CLIENT_FILTERS,
    stage: route.params.get("stage") || "",
  });
  const requestForm = useFilterForm({ query: "" });
  const offerForm = useFilterForm(DEFAULT_OFFER_FILTERS);
  const [showClientFilters, setShowClientFilters] = useState(false);
  const [showOfferFilters, setShowOfferFilters] = useState(false);
  const [offerTab, setOfferTab] = useState<OfferTab>("all");
  const [step, setStep] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  const { search, manager, stage } = clientForm.values;
  const requestedRequestId = route.params.get("request") || undefined;
  const requestedClientParam = route.params.get("client") || undefined;
  const requested = useGetRequestQuery(requestedRequestId ?? skipToken);
  const requestedClientId =
    requestedClientParam ||
    requested.data?.requests.find((r) => r.id === requestedRequestId)?.clientId;

  const clientsQuery = useGetClientsInfiniteQuery({
    company: admin ? company : undefined,
    search,
    manager,
    stage,
  });
  const clientDetail = useGetClientQuery(requestedClientId ?? skipToken);
  const clients = itemsOf(clientsQuery.data?.pages);
  const client =
    clients.find((c) => c.id === requestedClientId) ??
    clientDetail.data?.clients.find((c) => c.id === requestedClientId) ??
    clients[0];

  const requestsQuery = useGetRequestsInfiniteQuery(
    client
      ? { clientId: client.id, stage, search: requestForm.values.query }
      : skipToken,
  );
  const requests = itemsOf(requestsQuery.data?.pages);
  const request =
    requests.find((r) => r.id === requestedRequestId) ?? requests[0];
  const detail = useGetRequestQuery(request?.id ?? skipToken);

  const state = useScopedState([
    ...sliceOf(clientsQuery.data?.pages),
    clientDetail.data,
    ...sliceOf(requestsQuery.data?.pages),
    requested.data,
    detail.data,
  ]);
  const data = toBrokerView(state, company);

  const invalidClient = !!requestedClientParam && clientDetail.isError;
  const invalidRequest =
    !!requestedRequestId &&
    (requested.isError ||
      (!!requested.data &&
        !!requestedClientParam &&
        !requested.data.requests.some(
          (r) => r.id === requestedRequestId && r.clientId === requestedClientParam,
        )));

  const resetOfferFilters = () => {
    setOfferTab("all");
    offerForm.reset({
      ...DEFAULT_OFFER_FILTERS,
      sort: offerForm.getValues("sort"),
    });
  };

  useEffect(() => {
    resetOfferFilters();
    carousel.current?.scrollTo({ top: 0, left: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request?.id]);

  const offers = request
    ? state.offers.filter((o) => o.requestId === request.id)
    : [];
  const selected = request ? selectedOffers(state, request.id) : [];

  return {
    state,
    dispatch,
    data,
    actor,
    company,
    unavailable: !data.companies.length || invalidClient || invalidRequest,
    clientForm,
    requestForm,
    offerForm,
    showClientFilters,
    toggleClientFilters: () => setShowClientFilters((v) => !v),
    showOfferFilters,
    toggleOfferFilters: () => setShowOfferFilters((v) => !v),
    offerTab,
    setOfferTab,
    step,
    setStep,
    carousel,
    clients,
    client,
    requests,
    request,
    clientsPaging: {
      total: clientsQuery.data?.pages[0]?.total ?? clients.length,
      loading: clientsQuery.isFetching && !clientsQuery.isFetchingNextPage,
      loadingMore: clientsQuery.isFetchingNextPage,
      hasMore: clientsQuery.hasNextPage,
      loadMore: () => void clientsQuery.fetchNextPage(),
    },
    requestsPaging: {
      total: requestsQuery.data?.pages[0]?.total ?? requests.length,
      loading: requestsQuery.isFetching && !requestsQuery.isFetchingNextPage,
      loadingMore: requestsQuery.isFetchingNextPage,
      hasMore: requestsQuery.hasNextPage,
      loadMore: () => void requestsQuery.fetchNextPage(),
    },
    offers,
    selected,
    tabCounts: offerTabCounts(offers, selected),
    visibleOffers: visibleOffers(
      offers,
      data,
      selected,
      offerTab,
      offerForm.values,
    ),
    transfer: request ? activeTransfer(state, request.id) : undefined,
    editable: !!request && isRequestEditable(state, request) && !admin,
    resetOfferFilters,
    resetClientFilters: () => clientForm.reset(EMPTY_CLIENT_FILTERS),
    select: (clientId: string, requestId?: string) =>
      navigate(route.path, {
        ...(admin ? { company } : {}),
        client: clientId,
        request: requestId,
        stage: stage || undefined,
      }),
  };
}

export type WorkspaceModel = ReturnType<typeof useWorkspace>;

/** Booking and rejecting an offer, each confirmed by a toast that can undo it. */
export function useOfferActions({ dispatch, actor }: WorkspaceModel, offer: Offer) {
  const setBooked = async (booked: boolean, undoable = true) => {
    const { error } = await dispatch({
      type: "INTEREST",
      actor,
      offerId: offer.id,
      selected: booked,
    });
    if (error || !undoable) return;
    const toast = booked ? OFFER_TOASTS.booked : OFFER_TOASTS.unbooked;
    notify.success(toast.title, {
      description: toast.description,
      action: { label: UNDO_LABEL, onClick: () => void setBooked(!booked, false) },
    });
  };

  const setRejected = async (rejected: boolean, undoable = true) => {
    const { error } = await dispatch({
      type: rejected ? "REJECT" : "RESTORE",
      actor,
      offerId: offer.id,
    });
    if (error || !undoable) return;
    const toast = rejected ? OFFER_TOASTS.rejected : OFFER_TOASTS.restored;
    notify.success(toast.title, {
      description: toast.description,
      action: { label: UNDO_LABEL, onClick: () => void setRejected(!rejected, false) },
    });
  };

  return { setBooked, setRejected };
}
