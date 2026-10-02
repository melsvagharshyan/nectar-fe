import { navigate, panel } from "../app/router";
import type { DemoState, Role } from "../demo/types";

export const ROLE_WORKSPACE: Record<Role, string> = {
  broker: "/broker/workspace",
  partner: "/partner/requests",
  admin: "/admin/workspace",
};

export function openPropertyEditor(role: Role, propertyId?: string) {
  if (role === "partner")
    navigate(
      "/partner/objects/new",
      propertyId ? { object: propertyId, mode: "edit" } : {},
    );
  else
    panel("editor", { object: propertyId, mode: propertyId ? "edit" : "new" });
}

export function openRequestWorkspace(
  state: DemoState,
  role: Role,
  requestId: string,
) {
  if (role === "partner") {
    navigate(ROLE_WORKSPACE.partner, { request: requestId });
    return;
  }
  const request = state.requests.find((r) => r.id === requestId)!;
  const client = state.clients.find((c) => c.id === request.clientId)!;
  navigate(ROLE_WORKSPACE[role], {
    request: requestId,
    client: client.id,
    ...(role === "admin" ? { company: client.companyId } : {}),
  });
}
