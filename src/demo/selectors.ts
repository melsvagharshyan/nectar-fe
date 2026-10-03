import type { Actor, DemoState, Offer, Request } from "./types";
export const requestOffers = (state: DemoState, requestId: string) =>
  state.offers.filter((o) => o.requestId === requestId);
export const activeTransfer = (state: DemoState, requestId: string) =>
  state.transfers.find(
    (t) => t.requestId === requestId && t.state === "demo_transferred",
  );
export const isOfferAvailable = (state: DemoState, offer: Offer) =>
  !["closed", "unavailable"].includes(offer.state) &&
  state.properties.some(
    (p) => p.id === offer.propertyId && p.availability === "active",
  );
export const selectedOffers = (state: DemoState, requestId: string) =>
  requestOffers(state, requestId).filter(
    (o) =>
      ["interested", "transferred"].includes(o.state) &&
      isOfferAvailable(state, o),
  );
export const isRequestEditable = (state: DemoState, request: Request) =>
  ["in_progress", "has_offers"].includes(request.stage) &&
  !activeTransfer(state, request.id);
export const canSeeRequest = (
  state: DemoState,
  actor: Actor,
  request: Request,
): boolean =>
  actor.role === "admin" ||
  (actor.role === "broker"
    ? state.clients.some(
        (c) =>
          c.id === request.clientId &&
          c.companyId === actor.companyId,
      )
    : ["in_progress", "has_offers"].includes(request.stage) ||
      (["crm", "sold"].includes(request.stage) &&
        state.offers.some(
          (o) =>
            o.requestId === request.id &&
            o.companyId === actor.companyId,
        )));
export const scopedRequests = (state: DemoState, actor: Actor) =>
  state.requests.filter((r) => canSeeRequest(state, actor, r));
export const requiresAttention = (state: DemoState, request: Request) =>
  request.stage === "in_progress" &&
  !requestOffers(state, request.id).some((o) => isOfferAvailable(state, o)) &&
  Date.now() - Date.parse(request.createdAt) > 86400000;
export const offerPresentation = (
  state: DemoState,
  offer: Offer,
  actor: Actor,
) => {
  const request = state.requests.find((r) => r.id === offer.requestId);
  const editable =
    !!request &&
    isRequestEditable(state, request) &&
    canSeeRequest(state, actor, request);
  const available = isOfferAvailable(state, offer);
  const label =
    offer.state === "closed"
      ? offer.closeReason === "sold"
        ? "Продано"
        : "Не выбрано"
      : !available
        ? "Недоступно"
        : offer.disposition === "rejected"
          ? "Не подходит"
          : (
              {
                sent: "Предложено",
                interested: "Интерес",
                transferred: "Передано в CRM",
                unavailable: "Недоступно",
              } as const
            )[offer.state];
  return {
    label,
    available,
    selected: available && ["interested", "transferred"].includes(offer.state),
    canSelect:
      actor.role === "broker" &&
      editable &&
      available &&
      offer.disposition !== "rejected",
    canReject: actor.role === "broker" && editable && available,
    canRestore:
      actor.role === "broker" &&
      editable &&
      available &&
      offer.disposition === "rejected",
  };
};
export const propertyInterest = (state: DemoState, propertyId: string) =>
  new Set(
    state.offers
      .filter(
        (o) =>
          o.propertyId === propertyId &&
          isOfferAvailable(state, o) &&
          ["interested", "transferred"].includes(o.state),
      )
      .map((o) => o.requestId),
  ).size;
