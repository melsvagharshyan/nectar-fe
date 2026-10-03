import type { IconName } from "../../../components/ui";
import type { Role } from "../../../demo/types";

export interface SignUpFormValues {
  role: Role;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  adminCode: string;
  password: string;
  confirmPassword: string;
}

export type SignUpStep = "role" | "details";

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
  company?: {
    label: string;
    placeholder: string;
  };
}
