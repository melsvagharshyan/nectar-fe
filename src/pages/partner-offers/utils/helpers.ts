import { CLOSED_OFFER_STATES } from "./constants";
import type { PartnerOffer, PartnerOfferFilter } from "./types";

export const filterPartnerOffers = (
  offers: PartnerOffer[],
  filter: PartnerOfferFilter,
) =>
  offers.filter(
    (o) =>
      !filter ||
      (filter === "closed"
        ? CLOSED_OFFER_STATES.includes(o.state)
        : o.state === filter),
  );
