import { Suspense } from "react";
import { RecordScope } from "../../app/components/RecordScope";
import { closePanel, useRoute } from "../../app/router";
import { ObjectEditor } from "../../app/utils/pages";
import { Empty, Overlay } from "../../components/ui";
import { DemoForm, type DemoFormKind } from "../demo-form";
import { ClientPanel } from "./components/ClientPanel";
import { CompanyPanel } from "./components/CompanyPanel";
import { DeniedNotice } from "./components/DeniedNotice";
import { DirectoryPanel } from "./components/DirectoryPanel";
import { NotificationsPanel } from "./components/NotificationsPanel";
import { PropertyPanel } from "./components/PropertyPanel";
import { RequestPanel } from "./components/RequestPanel";
import { SendOfferPanel } from "./components/SendOfferPanel";
import { TransferPanel } from "./components/TransferPanel";
import { FORM_PANEL_SUFFIX } from "./utils/constants";
import { formRecordId } from "./utils/helpers";
import type { PanelProps } from "./utils/types";

export function Panels({ role, toast }: PanelProps) {
  const { params } = useRoute();
  const name = params.get("panel");
  if (!name) return null;
  const loading = (
    <Overlay title="Загрузка…" onClose={closePanel}>
      <Empty text="Загрузка…" />
    </Overlay>
  );
  return (
    <RecordScope
      role={role}
      requestId={params.get("request") || undefined}
      clientId={params.get("client") || undefined}
      propertyId={params.get("object") || undefined}
      fallback={loading}
    >
      <Suspense fallback={loading}>
        <Panel name={name} params={params} role={role} toast={toast} />
      </Suspense>
    </RecordScope>
  );
}

function Panel({
  name,
  params,
  role,
  toast,
}: PanelProps & { name: string; params: URLSearchParams }) {
  if (name.endsWith(FORM_PANEL_SUFFIX)) {
    const kind = name.replace(FORM_PANEL_SUFFIX, "") as DemoFormKind;
    return (
      <DemoForm
        kind={kind}
        id={formRecordId(kind, params)}
        clientId={params.get("client") || undefined}
        companyId={params.get("company") || undefined}
        onClose={closePanel}
        onSuccess={toast}
      />
    );
  }

  switch (name) {
    case "editor":
      return role === "broker" ? (
        <Overlay title="Объект" onClose={closePanel}>
          <DeniedNotice />
        </Overlay>
      ) : (
        <ObjectEditor
          propertyId={params.get("object") || undefined}
          onClose={closePanel}
          onSuccess={toast}
        />
      );
    case "property":
      return <PropertyPanel role={role} />;
    case "client":
      return <ClientPanel role={role} />;
    case "request":
    case "history":
      return (
        <RequestPanel role={role} toast={toast} historyOnly={name === "history"} />
      );
    case "send":
      return <SendOfferPanel role={role} toast={toast} />;
    case "transfer":
      return <TransferPanel role={role} toast={toast} />;
    case "company":
      return <CompanyPanel role={role} />;
    case "notifications":
      return <NotificationsPanel role={role} />;
    case "directory":
      return <DirectoryPanel role={role} />;
    default:
      return (
        <Overlay title="Панель" onClose={closePanel}>
          <Empty text="Панель не найдена" />
        </Overlay>
      );
  }
}
