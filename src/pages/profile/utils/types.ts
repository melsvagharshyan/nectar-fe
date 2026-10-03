export interface PersonalInfoFormValues {
  name: string;
  phone: string;
}

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/** 0 — empty, 1 — weak … 4 — strong. */
export type PasswordStrength = 0 | 1 | 2 | 3 | 4;
