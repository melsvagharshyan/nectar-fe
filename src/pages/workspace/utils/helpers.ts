import { requiresAttention } from "../../../demo/selectors";
import type { DemoState, Offer, Request } from "../../../demo/types";
import { matchesSearch, money } from "../../../utils/helpers";
import type {
  BrokerData,
  ClientFilters,
  OfferFilters,
  OfferTab,
} from "./types";

export const stageMatches = (state: DemoState, r: Request, stage: string) =>
  !stage ||
  (stage === "attention" ? requiresAttention(state, r) : r.stage === stage);

export const filterClients = (
  state: DemoState,
  data: BrokerData,
  { search, manager, stage }: ClientFilters,
) =>
  data.clients.filter(
    (c) =>
      (!manager || c.employeeId === manager) &&
      (!stage ||
        data.requests.some(
          (r) => r.clientId === c.id && stageMatches(state, r, stage),
        )) &&
      matchesSearch(`${c.name} ${c.id} ${c.phone}`, search),
  );

export const filterClientRequests = (
  state: DemoState,
  requests: Request[],
  clientId: string,
  stage: string,
  query: string,
) =>
  requests.filter(
    (r) =>
      r.clientId === clientId &&
      stageMatches(state, r, stage) &&
      matchesSearch(`${r.id} ${r.type} ${r.districts.join(" ")}`, query),
  );

const matchesTab = (offer: Offer, tab: OfferTab, selected: Offer[]) =>
  tab === "selected"
    ? selected.some((s) => s.id === offer.id)
    : tab === "rejected"
      ? offer.disposition === "rejected"
      : offer.disposition !== "rejected";

export function visibleOffers(
  offers: Offer[],
  data: BrokerData,
  selected: Offer[],
  tab: OfferTab,
  filters: OfferFilters,
) {
  const priceOf = (offer: Offer) =>
    data.properties.find((p) => p.id === offer.propertyId)!.price;
  return offers
    .filter((o) => {
      const p = data.properties.find((x) => x.id === o.propertyId)!;
      return (
        matchesTab(o, tab, selected) &&
        (!filters.district || p.district === filters.district) &&
        (!filters.budget || p.price <= Number(filters.budget)) &&
        (!filters.rooms || p.rooms === Number(filters.rooms))
      );
    })
    .sort((a, b) =>
      filters.sort === "match"
        ? b.matchScore - a.matchScore
        : (priceOf(a) - priceOf(b)) * (filters.sort === "desc" ? -1 : 1),
    );
}

export const offerTabCounts = (offers: Offer[], selected: Offer[]) => ({
  all: offers.filter((o) => o.disposition !== "rejected").length,
  selected: selected.length,
  rejected: offers.filter((o) => o.disposition === "rejected").length,
});

export const requestBudget = (r: Request) =>
  `${money(r.budgetMin)}–${money(r.budgetMax)}`;
