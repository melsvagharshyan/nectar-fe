import type { Actor, DemoEvent, DemoState, Offer, Request } from "./types";
export const requestOffers = (state: DemoState, requestId: string) =>
  state.offers.filter((o) => o.requestId === requestId);
export const companyProperties = (state: DemoState, companyId: string) =>
  state.properties.filter((p) => p.companyId === companyId);
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
export const visibleEvents = (state: DemoState, actor: Actor): DemoEvent[] =>
  state.events.filter((event) => {
    const request = state.requests.find((r) => r.id === event.requestId);
    if (!request || !canSeeRequest(state, actor, request)) return false;
    if (actor.role !== "partner") return true;
    if (event.type === "started")
      return ["in_progress", "has_offers"].includes(request.stage);
    return state.offers.some(
      (o) =>
        o.requestId === request.id &&
        o.companyId === actor.companyId &&
        (!event.propertyId || o.propertyId === event.propertyId),
    );
  });
export const metrics = (state: DemoState, actor: Actor = { role: "admin" }) => {
  const requests = scopedRequests(state, actor);
  const ids = new Set(requests.map((r) => r.id));
  const offers = state.offers.filter(
    (o) =>
      ids.has(o.requestId) &&
      (actor.role !== "partner" ||
        o.companyId === actor.companyId),
  );
  const transfers = state.transfers.filter((t) => ids.has(t.requestId));
  return {
    clients:
      actor.role === "partner"
        ? new Set(requests.map((r) => r.clientId)).size
        : state.clients.filter(
            (c) =>
              actor.role === "admin" ||
              c.companyId === actor.companyId,
          ).length,
    requests: requests.length,
    activeRequests: requests.filter((r) => r.stage !== "sold").length,
    offers: offers.length,
    interested: new Set(
      offers
        .filter(
          (o) =>
            ["interested", "transferred"].includes(o.state) &&
            isOfferAvailable(state, o) &&
            requests.find((r) => r.id === o.requestId)?.stage !== "sold",
        )
        .map((o) => o.requestId),
    ).size,
    activeTransfers: transfers.filter((t) => t.state === "demo_transferred")
      .length,
    reachedCrm: new Set(transfers.map((t) => t.requestId)).size,
    sold: transfers.filter((t) => t.state === "sold").length,
    attention: requests.filter((r) => requiresAttention(state, r)).length,
    properties: state.properties.filter(
      (p) =>
        actor.role !== "partner" ||
        p.companyId === actor.companyId,
    ).length,
    soldProperties: state.properties.filter(
      (p) =>
        p.availability === "sold" &&
        (actor.role !== "partner" ||
          p.companyId === actor.companyId),
    ).length,
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
export const popularDistricts = (state: DemoState, actor: Actor) =>
  scopedRequests(state, actor).reduce<Record<string, number>>((counts, r) => {
    r.districts.forEach((d) => {
      counts[d] = (counts[d] ?? 0) + 1;
    });
    return counts;
  }, {});
