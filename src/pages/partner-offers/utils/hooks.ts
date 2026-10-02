import { useState } from "react";
import { useDemo } from "../../../app/DemoProvider";
import { toPartnerView } from "../../../demo/projections";
import { offerPresentation } from "../../../demo/selectors";
import { actorForRole, currentCompanyId } from "../../../utils/helpers";
import { filterPartnerOffers } from "./helpers";
import type { PartnerOffer, PartnerOfferFilter } from "./types";

export function usePartnerOffers() {
  const [state] = useDemo();
  const data = toPartnerView(state, currentCompanyId());
  const [filter, setFilter] = useState<PartnerOfferFilter>("");
  const actor = actorForRole("partner");
  return {
    filter,
    setFilter,
    offers: filterPartnerOffers(data.offers, filter),
    propertyOf: (o: PartnerOffer) =>
      data.properties.find((p) => p.id === o.propertyId)!,
    resultOf: (o: PartnerOffer) => offerPresentation(state, o, actor).label,
  };
}
