import { OPEN_REQUEST_STAGES } from "../../../utils/constants";
import { matchesSearch } from "../../../utils/helpers";
import type {
  PartnerData,
  PartnerRequest,
  PartnerRequestFilters,
} from "./types";

export const isOpenForOffers = (r?: PartnerRequest) =>
  !!r && OPEN_REQUEST_STAGES.includes(r.stage);

export const filterPartnerRequests = (
  data: PartnerData,
  { search, filter }: PartnerRequestFilters,
) =>
  data.requests.filter(
    (r) =>
      (filter === "all" ||
        (filter === "mine"
          ? data.offers.some((o) => o.requestId === r.id)
          : isOpenForOffers(r))) &&
      matchesSearch(`${r.id} ${r.districts.join(" ")}`, search),
  );

export const availableProperties = (
  data: PartnerData,
  matching: boolean,
  request?: PartnerRequest,
) =>
  data.properties.filter(
    (p) =>
      p.availability === "active" &&
      (!matching ||
        (!!request &&
          request.districts.includes(p.district) &&
          p.price <= request.budgetMax)),
  );

export const roomsLabel = (rooms?: number | null) =>
  rooms === 0 ? "Студия" : rooms || "Любые";
