import { navigate } from "../../app/router";
import { PageHead } from "../../components/PageHead";
import { Tabs } from "../../components/ui";
import { AdminOffersTable } from "./components/AdminOffersTable";
import { AdminRequestsTable } from "./components/AdminRequestsTable";
import { AdminToolbar } from "./components/AdminToolbar";
import { ADMIN_VIEW_TABS } from "./utils/constants";
import { useAdminWorkspace } from "./utils/hooks";
import { PAGE } from "../../utils/styles";

export function AdminWorkspace() {
  const { state, view, control, requests, offers } = useAdminWorkspace();
  return (
    <div className={PAGE}>
      <PageHead
        title="Запросы и сделки"
        subtitle="Связанные запросы, предложения и передачи в CRM"
      />
      <Tabs
        items={ADMIN_VIEW_TABS}
        value={view}
        onChange={(id) => navigate("/admin/workspace", { view: id })}
      />
      <AdminToolbar control={control} companies={state.companies} />
      {view === "offers" ? (
        <AdminOffersTable state={state} offers={offers} />
      ) : (
        <AdminRequestsTable state={state} requests={requests} />
      )}
    </div>
  );
}
