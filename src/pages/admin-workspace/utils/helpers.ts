import { requiresAttention } from "../../../demo/selectors";
import type { DemoState, Request } from "../../../demo/types";
import { matchesSearch } from "../../../utils/helpers";
import { INTERESTED_OFFER_STATES } from "./constants";
import type { AdminFilters } from "./types";

const matchesView = (state: DemoState, r: Request, view: string) => {
  const offers = state.offers.filter((o) => o.requestId === r.id);
  switch (view) {
    case "active":
      return r.stage !== "sold";
    case "crm":
    case "sold":
      return r.stage === view;
    case "offers":
      return offers.length > 0;
    case "interested":
      return offers.some((o) => INTERESTED_OFFER_STATES.includes(o.state));
    default:
      return true;
  }
};

export const filterAdminRequests = (
  state: DemoState,
  { search, company, partner, attention }: AdminFilters,
  view: string,
) =>
  state.requests.filter(
    (r) =>
      matchesSearch(`${r.id} ${r.type} ${r.districts.join(" ")}`, search) &&
      (!company ||
        state.clients.find((c) => c.id === r.clientId)?.companyId ===
          company) &&
      (!partner ||
        state.offers.some(
          (o) => o.requestId === r.id && o.companyId === partner,
        )) &&
      (!attention || requiresAttention(state, r)) &&
      matchesView(state, r, view),
  );

export const filterAdminOffers = (
  state: DemoState,
  requests: Request[],
  partner: string,
) =>
  state.offers.filter(
    (o) =>
      requests.some((r) => r.id === o.requestId) &&
      (!partner || o.companyId === partner),
  );

export const companyName = (state: DemoState, companyId?: string) =>
  state.companies.find((c) => c.id === companyId)?.name;
