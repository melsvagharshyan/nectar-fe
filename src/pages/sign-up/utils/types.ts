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

export interface RoleOptionDetails {
  icon: IconName;
  description: string;
  companyLabel?: string;
}
