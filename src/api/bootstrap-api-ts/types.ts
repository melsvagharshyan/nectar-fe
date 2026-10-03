import type { Company, Employee } from "../../demo/types";

export interface Bootstrap {
  companies: Company[];
  employees: Employee[];
  unreadCount: number;
  attentionCount: number;
}
