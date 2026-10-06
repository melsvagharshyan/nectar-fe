export interface SignInFormValues {
  email: string;
  password: string;
}

/** Why the account can't be used yet, shown above the form. */
export type SignInNotice =
  | { kind: "pending" }
  | { kind: "rejected"; reason?: string }
  | { kind: "blocked"; reason?: string };
