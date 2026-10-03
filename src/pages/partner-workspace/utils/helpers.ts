import { OPEN_REQUEST_STAGES } from "../../../utils/constants";
import type { PartnerRequest } from "./types";

export const isOpenForOffers = (r?: PartnerRequest) =>
  !!r && OPEN_REQUEST_STAGES.includes(r.stage);

export const roomsLabel = (rooms?: number | null) =>
  rooms === 0 ? "Студия" : rooms || "Любые";
