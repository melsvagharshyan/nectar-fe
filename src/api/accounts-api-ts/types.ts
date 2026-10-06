import type { Role } from "../../demo/types";

/** A sign-in account of a company, as admins see it. */
export interface Account {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  blockedAt: string | null;
  blockReason: string | null;
  blockedByName: string | null;
}

export interface BlockUserArgs {
  id: string;
  /** Shown to the user when they try to sign in. */
  reason: string;
}
