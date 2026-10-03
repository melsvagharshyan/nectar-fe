import { useEffect, useRef, useState } from "react";
import { useDemo } from "../../../app/DemoProvider";
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
import {
  filterClientRequests,
  filterClients,
  offerTabCounts,
  visibleOffers,
} from "./helpers";
import type { OfferTab } from "./types";

export function useWorkspace(admin: boolean) {
  const [state, dispatch] = useDemo();
  const route = useRoute();
  const company =
    (admin && route.params.get("company")) || brokerCompanyIdFor(state);
  const data = toBrokerView(state, company);
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

  const { stage } = clientForm.values;
  const clients = filterClients(state, data, clientForm.values);
  const requestedRequestId = route.params.get("request");
  const requestedClientId =
    route.params.get("client") ||
    data.requests.find((r) => r.id === requestedRequestId)?.clientId;
  const client =
    clients.find((c) => c.id === requestedClientId) || clients[0];
  const requests = client
    ? filterClientRequests(
        state,
        data.requests,
        client.id,
        stage,
        requestForm.values.query,
      )
    : [];
  const request =
    requests.find((r) => r.id === requestedRequestId) || requests[0];

  const invalidClient =
    !!requestedClientId && !data.clients.some((c) => c.id === requestedClientId);
  const invalidRequest =
    !!requestedRequestId &&
    !data.requests.some(
      (r) =>
        r.id === requestedRequestId &&
        (!requestedClientId || r.clientId === requestedClientId),
    );

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
