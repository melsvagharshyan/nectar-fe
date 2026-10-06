import type { SignUpRole } from "../../../api/auth-api-ts/types";
import type { IconName } from "../../../components/ui";

export interface SignUpFormValues {
  role: SignUpRole;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

export type SignUpStep = "role" | "details" | "submitted";

export interface SignUpStepCopy {
  title: string;
  subtitle: string;
}

export interface RoleOptionDetails {
  icon: IconName;
  title: string;
  tag: string;
  description: string;
  phonePlaceholder: string;
  company: {
    label: string;
    placeholder: string;
  };
}
