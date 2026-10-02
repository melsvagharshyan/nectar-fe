import { scopedRequests, visibleEvents } from "./selectors";
import type { DemoState, Offer, Property } from "./types";
export type PublicProperty = Omit<
  Property,
  "companyId" | "privateNotes" | "internalAddress"
>;
export type BrokerOffer = Omit<Offer, "companyId">;
export function toBrokerView(state: DemoState, companyId?: string) {
  const actor = { role: "broker" as const, companyId };
  const clients = state.clients.filter((c) => c.companyId === companyId);
  const requests = scopedRequests(state, actor);
  const requestIds = new Set(requests.map((r) => r.id));
  const offers: BrokerOffer[] = state.offers
    .filter((o) => requestIds.has(o.requestId))
    .map(({ companyId: _company, ...o }) => o);
  const propertyIds = new Set(offers.map((o) => o.propertyId));
  const properties: PublicProperty[] = state.properties
    .filter((p) => p.availability === "active" || propertyIds.has(p.id))
    .map(
      ({
        companyId: _company,
        privateNotes: _notes,
        internalAddress: _address,
        ...p
      }) => p,
    );
  return {
    clients,
    requests,
    offers,
    properties,
    companies: state.companies.filter((c) => c.id === companyId),
    employees: state.employees.filter((e) => e.companyId === companyId),
    transfers: state.transfers.filter((t) => requestIds.has(t.requestId)),
    events: visibleEvents(state, actor),
    readEventIds: state.readEventIds,
  };
}
export function toPartnerView(state: DemoState, companyId?: string) {
  const actor = { role: "partner" as const, companyId };
  const requests = scopedRequests(state, actor).map(({ clientId, ...r }) => ({
    ...r,
    publicClientId: state.clients.find((c) => c.id === clientId)!.publicId,
  }));
  const offers = state.offers.filter((o) => o.companyId === companyId);
  const offerIds = new Set(offers.map((o) => o.id));
  const transfers = state.transfers
    .filter((t) => t.offerIds.some((id) => offerIds.has(id)))
    .map((t) => ({
      ...t,
      offerIds: t.offerIds.filter((id) => offerIds.has(id)),
      soldPropertyId: state.properties.some(
        (p) => p.id === t.soldPropertyId && p.companyId === companyId,
      )
        ? t.soldPropertyId
        : undefined,
    }));
  const ownIds = new Set(
    state.properties.filter((p) => p.companyId === companyId).map((p) => p.id),
  );
  const requestIds = new Set(requests.map((r) => r.id));
  return {
    requests,
    offers,
    properties: state.properties.filter((p) => p.companyId === companyId),
    companies: state.companies.filter((c) => c.id === companyId),
    employees: state.employees.filter((e) => e.companyId === companyId),
    transfers,
    drafts: Object.fromEntries(
      Object.entries(state.drafts)
        .filter(([id]) => requestIds.has(id))
        .map(([id, ids]) => [id, ids.filter((p) => ownIds.has(p))]),
    ),
    events: visibleEvents(state, actor),
    readEventIds: state.readEventIds,
  };
}
export const toAdminView = (state: DemoState) => structuredClone(state);
