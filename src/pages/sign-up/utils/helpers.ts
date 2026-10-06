import type { SignUpRequest } from "../../../api/auth-api-ts/types";
import type { SignUpFormValues } from "./types";

export function toSignUpRequest(values: SignUpFormValues): SignUpRequest {
  const { role, name, email, phone, password, companyName } = values;
  return {
    role,
    name,
    email,
    password,
    companyName,
    ...(phone ? { phone } : {}),
  };
}
