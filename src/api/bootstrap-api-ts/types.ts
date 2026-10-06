import type { Company, Employee } from "../../demo/types";

export interface Bootstrap {
  companies: Company[];
  employees: Employee[];
  unreadCount: number;
  attentionCount: number;
  /** Requests waiting for admin review; 0 for non-admins. */
  pendingRequests: number;
  /** Offers waiting for admin review; 0 for non-admins. */
  pendingOffers: number;
  /** Sign-up applications waiting for admin review; 0 for non-admins. */
  pendingRegistrations: number;
}
