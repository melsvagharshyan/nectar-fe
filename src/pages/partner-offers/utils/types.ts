import type { toPartnerView } from "../../../demo/projections";

export type PartnerData = ReturnType<typeof toPartnerView>;

export type PartnerOffer = PartnerData["offers"][number];

export type PartnerOfferFilter =
  | ""
  | "sent"
  | "interested"
  | "transferred"
  | "closed";
