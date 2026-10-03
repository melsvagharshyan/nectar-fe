import type { Company } from "../../demo/types";
import type { CursorPage } from "../pagination";

export interface CompaniesArgs {
  kind?: "rf" | "am";
  search?: string;
  limit?: number;
}

export interface CompanyListItem extends Company {
  stats: [number, number];
}

export type CompaniesPage = CursorPage<CompanyListItem> & {
  counts: Record<"rf" | "am", number>;
};
