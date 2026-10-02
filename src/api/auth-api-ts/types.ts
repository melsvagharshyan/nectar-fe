import type { Role } from "../../demo/types";

export interface UserDto {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: Role;
  companyId: string | null;
  companyName: string | null;
}

/** The access token itself is set by the server as an httpOnly cookie. */
export interface AuthResponse {
  user: UserDto;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  role: Role;
  name: string;
  email: string;
  password: string;
  phone?: string;
  companyName?: string;
  adminCode?: string;
}
