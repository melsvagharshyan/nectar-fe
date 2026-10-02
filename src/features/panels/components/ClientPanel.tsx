import { closePanel, panel } from "../../../app/router";
import { Avatar, Badge, Button, Overlay, OverlayFooter } from "../../../components/ui";
import { currentCompanyId } from "../../../utils/helpers";
import { employeeNameOf } from "../utils/helpers";
import { usePanelContext } from "../utils/hooks";
import type { PanelProps } from "../utils/types";
import { DeniedNotice } from "./DeniedNotice";
import { DETAILS_GRID, RECORD, ROW } from "../../../utils/styles";

export function ClientPanel({ role }: Pick<PanelProps, "role">) {
  const { state, params, goToRequest } = usePanelContext(role);
  const client =
    role === "partner"
      ? undefined
      : state.clients.find(
          (c) =>
            c.id === params.clientId &&
            (role === "admin" || c.companyId === currentCompanyId()),
        );

  return (
    <Overlay title="Карточка клиента" onClose={closePanel}>
      {client ? (
        <>
          <div className={ROW}>
            <Avatar name={client.name} src={client.avatar} />
            <div>
              <h2>{client.name}</h2>
              <small>{client.id}</small>
            </div>
          </div>
          <dl className={DETAILS_GRID}>
            <div>
              <dt>Телефон</dt>
              <dd>{client.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{client.email}</dd>
            </div>
            <div>
              <dt>Ответственный менеджер</dt>
              <dd>{employeeNameOf(state, client.employeeId)}</dd>
            </div>
          </dl>
          <h3>Связанные запросы</h3>
          {state.requests
            .filter((r) => r.clientId === client.id)
            .map((r) => (
              <div className={RECORD} key={r.id}>
                <Button variant="link" onClick={() => goToRequest(r.id)}>
                  {r.id} · {r.type}
                </Button>
                <Badge value={r.stage} />
              </div>
            ))}
          {role === "broker" && (
            <OverlayFooter>
              <Button
                variant="secondary"
                onClick={() =>
                  panel("client-form", { client: client.id, mode: "edit" })
                }
              >
                Изменить
              </Button>
            </OverlayFooter>
          )}
        </>
      ) : (
        <DeniedNotice />
      )}
    </Overlay>
  );
}
