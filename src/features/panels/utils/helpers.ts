import type { DemoState } from "../../../demo/types";
import type { DemoFormKind } from "../../demo-form";
export const clientOf = (state: DemoState, clientId: string) =>
  state.clients.find((c) => c.id === clientId);

export const companyNameOf = (state: DemoState, companyId?: string) =>
  state.companies.find((c) => c.id === companyId)?.name;

export const employeeNameOf = (state: DemoState, employeeId?: string) =>
  state.employees.find((e) => e.id === employeeId)?.name;

export function formRecordId(
  kind: DemoFormKind,
  params: URLSearchParams,
): string | undefined {
  if (params.get("mode") !== "edit") return undefined;
  const key =
    kind === "client"
      ? "client"
      : kind === "request"
        ? "request"
        : kind === "company"
          ? "company"
          : "employee";
  return params.get(key) || undefined;
}
