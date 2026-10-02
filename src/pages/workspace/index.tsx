import { MobileSteps } from "../../components/MobileSteps";
import { WORKSPACE_CONTAINER } from "../../utils/styles";
import { AdminContextBar } from "./components/AdminContextBar";
import { ClientsColumn } from "./components/ClientsColumn";
import { OffersColumn } from "./components/OffersColumn";
import { RequestsColumn } from "./components/RequestsColumn";
import { WorkspaceUnavailable } from "./components/WorkspaceUnavailable";
import { WORKSPACE_STEPS } from "./utils/constants";
import { useWorkspace } from "./utils/hooks";
import { GRID } from "./utils/styles";

export function Workspace({ admin = false }: { admin?: boolean }) {
  const model = useWorkspace(admin);
  if (model.unavailable) return <WorkspaceUnavailable admin={admin} />;
  return (
    <div className={`${WORKSPACE_CONTAINER} reference-workspace`}>
      {admin && (
        <AdminContextBar
          company={model.company}
          companyName={model.data.companies[0].name}
        />
      )}
      <MobileSteps
        steps={WORKSPACE_STEPS}
        value={model.step}
        onChange={model.setStep}
      />
      <div className={GRID} data-step={model.step}>
        <ClientsColumn model={model} admin={admin} />
        <RequestsColumn model={model} admin={admin} />
        <OffersColumn model={model} admin={admin} />
      </div>
    </div>
  );
}
