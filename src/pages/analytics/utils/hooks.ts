import { useGetAnalyticsQuery } from "../../../api/analytics-api-ts/analyticsApi";
import type { Role } from "../../../demo/types";
import { EMPTY_METRICS } from "./constants";
import { metricCards } from "./helpers";

export function useAnalytics(role: Role) {
  const { data } = useGetAnalyticsQuery();
  const metrics = data?.metrics ?? EMPTY_METRICS;
  return {
    metrics,
    cards: metricCards(role, metrics),
    districts: data?.districts ?? {},
    stages: data?.stages ?? {},
    companies: data?.companies ?? [],
    transfers: data?.overview.transfers ?? [],
    attention: data?.overview.attention ?? [],
  };
}
