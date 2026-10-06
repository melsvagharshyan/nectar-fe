import type { SignUpRole } from "../../../api/auth-api-ts/types";

export interface RegistrationFilters {
  search: string;
  /** Empty string means all roles. */
  role: "" | SignUpRole;
}

export interface RejectValues {
  reason: string;
}
