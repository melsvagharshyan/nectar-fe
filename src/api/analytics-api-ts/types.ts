import type { Request, RequestStage, Transfer } from "../../demo/types";
import type { WithSlice } from "../pagination";

export interface Metrics {
  clients: number;
  requests: number;
  activeRequests: number;
  offers: number;
  interested: number;
  activeTransfers: number;
  reachedCrm: number;
  sold: number;
  attention: number;
  properties: number;
  soldProperties: number;
}

export interface CompanyActivityItem {
  id: string;
  name: string;
  kind: "rf" | "am";
  count: number;
}

export interface Analytics {
  metrics: Metrics;
  districts: Record<string, number>;
  stages: Partial<Record<RequestStage, number>>;
  companies: CompanyActivityItem[];
  overview: WithSlice<{ transfers: Transfer[]; attention: Request[] }>;
}

export type { DistrictStatsMap } from "../../components/district-map";
