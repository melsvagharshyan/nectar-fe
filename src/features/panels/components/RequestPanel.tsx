import { closePanel } from "../../../app/router";
import { Timeline } from "../../../components/Timeline";
import { Overlay } from "../../../components/ui";
import { usePanelContext } from "../utils/hooks";
import type { PanelProps } from "../utils/types";
import { DeniedNotice } from "./DeniedNotice";
import { RequestDetails } from "./RequestDetails";

export function RequestPanel({
  role,
  toast,
  historyOnly,
}: PanelProps & { historyOnly: boolean }) {
  const { request } = usePanelContext(role);
  return (
    <Overlay
      title={request ? `Запрос ${request.id}` : "Запрос"}
      onClose={closePanel}
    >
      {!request ? (
        <DeniedNotice />
      ) : historyOnly ? (
        <Timeline requestId={request.id} />
      ) : (
        <RequestDetails role={role} request={request} toast={toast} />
      )}
    </Overlay>
  );
}
