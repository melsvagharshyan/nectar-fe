import { navigate } from "../../../app/router";
import { Timeline } from "../../../components/Timeline";
import { requiresAttention } from "../../../demo/selectors";
import type { DemoState, Role } from "../../../demo/types";
import { ActionRecord } from "./ActionRecord";
import { BOX, TWO_COL } from "../../../utils/styles";

export function OverviewSection({
  state,
  role,
  attentionCount,
}: {
  state: DemoState;
  role: Role;
  attentionCount: number;
}) {
  return (
    <div className={TWO_COL}>
      <div className={BOX}>
        <h2>Ожидают решения</h2>
        {state.transfers
          .filter((t) => t.state === "demo_transferred")
          .map((t) => (
            <ActionRecord
              key={t.id}
              title={t.requestId}
              description={`${t.id} · объектов: ${t.offerIds.length}`}
              actionLabel="Рассмотреть"
              onAction={() =>
                navigate("/admin/workspace", {
                  view: "crm",
                  request: t.requestId,
                  panel: "transfer",
                })
              }
            />
          ))}
        <h2 className="mt-20">Требует внимания · {attentionCount}</h2>
        {state.requests
          .filter((r) => requiresAttention(state, r))
          .map((r) => (
            <ActionRecord
              key={r.id}
              title={r.id}
              description="Нет предложений более 24 часов"
              actionLabel="Открыть"
              onAction={() =>
                navigate("/admin/workspace", {
                  request: r.id,
                  panel: "request",
                })
              }
            />
          ))}
      </div>
      <div className={BOX}>
        <h2>Последние события</h2>
        <Timeline role={role} />
      </div>
    </div>
  );
}
