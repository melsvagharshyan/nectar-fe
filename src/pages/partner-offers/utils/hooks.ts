import { useState } from "react";
import { useGetOffersTableQuery } from "../../../api/offers-api-ts/offersApi";
import { useScopedState } from "../../../app/DemoProvider";
import { useWorkspaceDispatch } from "../../../app/utils/hooks";
import { notify } from "../../../components/toaster";
import { toPartnerView } from "../../../demo/projections";
import { offerPresentation } from "../../../demo/selectors";
import { PAGE_SIZE } from "../../../utils/constants";
import { actorForRole, currentCompanyId } from "../../../utils/helpers";
import { usePagedArgs } from "../../../utils/hooks";
import type { PartnerOffer, PartnerOfferFilter } from "./types";

const REVIEW_FILTERS: Partial<
  Record<PartnerOfferFilter, "pending" | "rejected">
> = { review: "pending", declined: "rejected" };

export function usePartnerOffers() {
  const [filter, setFilter] = useState<PartnerOfferFilter>("");
  const paged = usePagedArgs({
    ...(REVIEW_FILTERS[filter]
      ? { review: REVIEW_FILTERS[filter] }
      : { state: filter === "closed" ? "closed_any" : filter }),
    limit: PAGE_SIZE,
  });
  const { dispatch } = useWorkspaceDispatch();
  const { data: table, isFetching } = useGetOffersTableQuery(paged.args);
  const state = useScopedState([table?.slice]);
  const data = toPartnerView(state, currentCompanyId());
  const actor = actorForRole("partner");
  const offers = (table?.items ?? [])
    .map((item) => data.offers.find((o) => o.id === item.id))
    .filter((o): o is PartnerOffer => !!o);

  return {
    filter,
    setFilter,
    offers,
    loading: isFetching,
    paging: {
      page: paged.page,
      pageSize: PAGE_SIZE,
      total: table?.total ?? 0,
      onChange: paged.setPage,
    },
    propertyOf: (o: PartnerOffer) =>
      data.properties.find((p) => p.id === o.propertyId)!,
    presentationOf: (o: PartnerOffer) => offerPresentation(state, o, actor),
    resubmit: async (o: PartnerOffer) => {
      const { error } = await dispatch({
        type: "RESUBMIT_OFFER",
        actor,
        offerId: o.id,
      });
      if (!error)
        notify.success("Предложение отправлено повторно", {
          description: "Администратор проверит его ещё раз",
        });
    },
  };
}
