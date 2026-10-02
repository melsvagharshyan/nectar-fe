import { useDemo } from "../../../app/DemoProvider";
import { useRoute } from "../../../app/router";
import { toBrokerView, toPartnerView } from "../../../demo/projections";
import { canSeeRequest } from "../../../demo/selectors";
import type { Role } from "../../../demo/types";
import { actorForRole, currentCompanyId } from "../../../utils/helpers";
import { openRequestWorkspace } from "../../../utils/navigation";

export function usePanelContext(role: Role) {
  const [state, dispatch] = useDemo();
  const route = useRoute();
  const params = {
    panel: route.params.get("panel"),
    objectId: route.params.get("object") || "",
    requestId: route.params.get("request") || "",
    clientId: route.params.get("client") || "",
    companyId: route.params.get("company") || "",
  };
  const actor = actorForRole(role);
  const projected =
    role === "broker"
      ? toBrokerView(state, currentCompanyId())
      : role === "partner"
        ? toPartnerView(state, currentCompanyId())
        : state;
  const request = state.requests.find((r) => r.id === params.requestId);
  const requestAllowed = !!request && canSeeRequest(state, actor, request);

  return {
    state,
    dispatch,
    route,
    params,
    actor,
    projected,
    request: requestAllowed ? request : undefined,
    goToRequest: (requestId: string) =>
      openRequestWorkspace(state, role, requestId),
  };
}
