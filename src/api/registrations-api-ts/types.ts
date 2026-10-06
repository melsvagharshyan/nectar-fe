import type { SignUpRole } from "../auth-api-ts/types";
import type { CursorPage } from "../pagination";

export type RegistrationStatus = "pending" | "approved" | "rejected";

/** A sign-up application as admins see it. */
export interface Registration {
  id: string;
  role: SignUpRole;
  status: RegistrationStatus;
  email: string;
  name: string;
  phone: string;
  companyName: string;
  rejectReason: string | null;
  reviewedAt: string | null;
  reviewedByName: string | null;
  userId: string | null;
  companyId: string | null;
  /** For approved requests: the current state of the created account. */
  userBlockedAt: string | null;
  userBlockReason: string | null;
  createdAt: string;
}

export interface RegistrationsArgs {
  status?: RegistrationStatus;
  role?: SignUpRole;
  search?: string;
  limit?: number;
}

/** `counts` follow the role and search filters, but not `status`. */
export type RegistrationsPage = CursorPage<Registration> & {
  counts: Record<RegistrationStatus, number>;
};

export interface ApproveRegistrationResult {
  ok: true;
  userId: string;
  companyId: string;
}

export interface RejectRegistrationArgs {
  id: string;
  /** Shown to the applicant when they try to sign in. */
  reason: string;
}
