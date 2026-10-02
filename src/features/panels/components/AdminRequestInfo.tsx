import type { Client, DemoState } from "../../../demo/types";
import { companyNameOf, employeeNameOf } from "../utils/helpers";
import { BOX } from "../../../utils/styles";
import { cn } from "../../../utils/helpers";

export function AdminRequestInfo({
  state,
  client,
}: {
  state: DemoState;
  client?: Client;
}) {
  return (
    <div className={cn(BOX, "mt-20")}>
      <p>{companyNameOf(state, client?.companyId)}</p>
      <p className="text-muted">
        Ответственный: {employeeNameOf(state, client?.employeeId)}
      </p>
    </div>
  );
}
