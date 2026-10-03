import { requestsApi } from "../api/requests-api-ts/requestsApi";
import { store } from "../api/store";
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

type RequestRecords = Pick<DemoState, "requests" | "clients">;

const clientOfRequest = (records: RequestRecords, requestId: string) => {
  const request = records.requests.find((r) => r.id === requestId);
  return request && records.clients.find((c) => c.id === request.clientId);
};

async function loadRequestRecords(requestId: string) {
  const query = store.dispatch(requestsApi.endpoints.getRequest.initiate(requestId));
  const { data } = await query;
  query.unsubscribe();
  return data;
}

export async function openRequestWorkspace(
  state: RequestRecords,
  role: Role,
  requestId: string,
) {
  if (role === "partner") {
    navigate(ROLE_WORKSPACE.partner, { request: requestId });
    return;
  }
  let client = clientOfRequest(state, requestId);
  if (!client) {
    const loaded = await loadRequestRecords(requestId);
    client = loaded && clientOfRequest(loaded, requestId);
  }
  if (!client) return;
  navigate(ROLE_WORKSPACE[role], {
    request: requestId,
    client: client.id,
    ...(role === "admin" ? { company: client.companyId } : {}),
  });
}
