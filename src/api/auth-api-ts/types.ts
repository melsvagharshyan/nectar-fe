import type { Role } from "../../demo/types";

export interface UserDto {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatarUrl: string | null;
  role: Role;
  companyId: string | null;
  companyName: string | null;
  /** ISO date of registration. */
  createdAt: string;
}

/** Omitted fields stay unchanged; `avatarUrl: null` removes the photo. */
export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  avatarUrl?: string | null;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface AvatarUploadResponse {
  url: string;
}

/** The access token itself is set by the server as an httpOnly cookie. */
export interface AuthResponse {
  user: UserDto;
}

export interface SignInRequest {
  email: string;
  password: string;
}

/** Admins are provisioned separately and never sign up. */
export type SignUpRole = Exclude<Role, "admin">;

export interface SignUpRequest {
  role: SignUpRole;
  name: string;
  email: string;
  password: string;
  phone?: string;
  companyName: string;
}

/** Sign-up only files an application; an admin creates the account on approval. */
export interface SignUpResponse {
  status: "pending";
  email: string;
}
