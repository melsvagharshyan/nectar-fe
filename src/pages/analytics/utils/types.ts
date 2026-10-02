import type { metrics } from "../../../demo/selectors";

export type Metrics = ReturnType<typeof metrics>;

export type MetricView = "" | "active" | "offers" | "interested" | "crm" | "sold";

export interface MetricCard {
  name: string;
  value: number;
  view: MetricView;
}
