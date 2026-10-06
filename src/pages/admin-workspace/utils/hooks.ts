import { useGetOffersTableQuery } from "../../../api/offers-api-ts/offersApi";
import { useGetRequestsTableQuery } from "../../../api/requests-api-ts/requestsApi";
import { useScopedState } from "../../../app/DemoProvider";
import { useRoute } from "../../../app/router";
import { PAGE_SIZE } from "../../../utils/constants";
import { useFilterForm, usePagedArgs } from "../../../utils/hooks";
import { DEFAULT_ADMIN_FILTERS, OFFER_REVIEW_VIEW } from "./constants";

export function useAdminWorkspace() {
  const route = useRoute();
  const view = route.params.get("view") || "";
  const form = useFilterForm(DEFAULT_ADMIN_FILTERS);
  const isOfferReview = view === OFFER_REVIEW_VIEW;
  const isOffers = view === "offers" || isOfferReview;
  const paged = usePagedArgs({
    ...form.values,
    ...(isOfferReview
      ? { review: "pending" as const }
      : { view: isOffers ? "offers" : view }),
    limit: PAGE_SIZE,
  });
  const requestsTable = useGetRequestsTableQuery(paged.args, { skip: isOffers });
  const offersTable = useGetOffersTableQuery(paged.args, { skip: !isOffers });
  const table = isOffers ? offersTable : requestsTable;
  const state = useScopedState([table.data?.slice]);

  return {
    state,
    view,
    isOffers,
    control: form.control,
    requests: requestsTable.data?.items ?? [],
    offers: offersTable.data?.items ?? [],
    loading: table.isFetching,
    paging: {
      page: paged.page,
      pageSize: PAGE_SIZE,
      total: table.data?.total ?? 0,
      onChange: paged.setPage,
    },
  };
}
