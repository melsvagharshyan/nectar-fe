import type { UserDto } from "./auth-api-ts/types";

/**
 * Only the user profile is cached here (to render the UI right after a reload).
 * The access token lives in an httpOnly cookie that scripts cannot read.
 */
const STORAGE_KEY = "nectar-user";
const LEGACY_TOKEN_KEY = "nectar-session";

let current: UserDto | null = readStoredUser();

function readStoredUser(): UserDto | null {
  if (typeof localStorage === "undefined") return null;
  try {
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserDto) : null;
  } catch {
    return null;
  }
}

export const getStoredUser = () => current;

export function setStoredUser(user: UserDto | null) {
  current = user;
  if (typeof localStorage === "undefined") return;
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be unavailable (private mode); the user still lives in memory.
  }
}

/** Company of the signed-in broker/partner; admins have none. */
export const sessionCompanyId = () => current?.companyId ?? undefined;
