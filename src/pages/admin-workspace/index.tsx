import { useGetBootstrapQuery } from "../../api/bootstrap-api-ts/bootstrapApi";
import { navigate } from "../../app/router";
import { PageHead } from "../../components/PageHead";
import { Tabs } from "../../components/ui";
import { AdminOffersTable } from "./components/AdminOffersTable";
import { AdminRequestsTable } from "./components/AdminRequestsTable";
import { AdminToolbar } from "./components/AdminToolbar";
import { ADMIN_VIEW_TABS, OFFER_REVIEW_VIEW } from "./utils/constants";
import { useAdminWorkspace } from "./utils/hooks";
import { PAGE } from "../../utils/styles";

export function AdminWorkspace() {
  const { state, view, isOffers, control, requests, offers, paging, loading } =
    useAdminWorkspace();
  const bootstrap = useGetBootstrapQuery().data;
  const counts: Record<string, number> = {
    review: bootstrap?.pendingRequests ?? 0,
    [OFFER_REVIEW_VIEW]: bootstrap?.pendingOffers ?? 0,
  };
  const tabs = ADMIN_VIEW_TABS.map((tab) =>
    tab.id in counts ? { ...tab, count: counts[tab.id] } : tab,
  );
  return (
    <div className={PAGE}>
      <PageHead
        title="Запросы и сделки"
        subtitle="Проверка запросов и предложений, резервы и сделки"
      />
      <Tabs
        items={tabs}
        value={view}
        onChange={(id) => navigate("/admin/workspace", { view: id })}
      />
      <AdminToolbar control={control} companies={state.companies} />
      {isOffers ? (
        <AdminOffersTable
          state={state}
          offers={offers}
          paging={paging}
          loading={loading}
        />
      ) : (
        <AdminRequestsTable
          state={state}
          requests={requests}
          paging={paging}
          loading={loading}
        />
      )}
    </div>
  );
}
