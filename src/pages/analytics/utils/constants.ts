import type { Metrics } from "../../../api/analytics-api-ts/types";
import type { RequestStage } from "../../../demo/types";

export const EMPTY_METRICS: Metrics = {
  clients: 0,
  requests: 0,
  activeRequests: 0,
  offers: 0,
  interested: 0,
  activeTransfers: 0,
  reachedCrm: 0,
  sold: 0,
  attention: 0,
  properties: 0,
  soldProperties: 0,
};

export const ANALYTICS_STAGES: RequestStage[] = [
  "created",
  "in_progress",
  "has_offers",
  "crm",
  "sold",
];
