export type { Metrics } from "../../../api/analytics-api-ts/types";

export type MetricView = "" | "active" | "offers" | "interested" | "crm" | "sold";

export interface MetricCard {
  name: string;
  value: number;
  view: MetricView;
}
