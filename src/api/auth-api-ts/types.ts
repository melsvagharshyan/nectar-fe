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

export interface SignUpRequest {
  role: Role;
  name: string;
  email: string;
  password: string;
  phone?: string;
  companyName?: string;
  adminCode?: string;
}
