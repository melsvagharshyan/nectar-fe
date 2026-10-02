import type { DemoState } from "../../../demo/types";

export type Company = DemoState["companies"][number];

export type CompanyKind = Company["kind"];

export interface CompanyStat {
  label: string;
  value: number;
}
