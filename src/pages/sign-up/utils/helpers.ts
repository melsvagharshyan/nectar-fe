import type { SignUpRequest } from "../../../api/auth-api-ts/types";
import type { SignUpFormValues } from "./types";

export function toSignUpRequest(values: SignUpFormValues): SignUpRequest {
  const { role, name, email, phone, password, companyName, adminCode } = values;
  return {
    role,
    name,
    email,
    password,
    ...(phone ? { phone } : {}),
    ...(role === "admin" ? { adminCode } : { companyName }),
  };
}
