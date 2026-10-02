import { useDemo } from "../../../app/DemoProvider";
import { metrics, popularDistricts } from "../../../demo/selectors";
import type { Role } from "../../../demo/types";
import { analyticsActor, metricCards, scopedRequests } from "./helpers";

export function useAnalytics(role: Role) {
  const [state] = useDemo();
  const actor = analyticsActor(role);
  const m = metrics(state, actor);
  return {
    state,
    metrics: m,
    cards: metricCards(role, m),
    districts: popularDistricts(state, actor),
    requests: scopedRequests(state, role),
  };
}
