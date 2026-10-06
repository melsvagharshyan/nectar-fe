import type { SyntheticEvent } from "react";
import type { UserDto } from "../../api/auth-api-ts/types";
import type { Role } from "../../demo/types";
import { FALLBACK_IMAGE, ROLE_HOMES, ROLE_NAMES } from "../../utils/constants";
import { asset } from "../../utils/helpers";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "./constants";
import type { Route, ShellLocation } from "./types";

/** Where the current path should send this user, or `null` to stay. */
export function authRedirect(path: string, user: UserDto | null): string | null {
  if (!user) return PUBLIC_ROUTES.includes(path) ? null : signInRoute(path);
  if (path === "/ui-kit") return null;
  if (PUBLIC_ROUTES.includes(path) || path === "/") return ROLE_HOMES[user.role];
  const [, segment = ""] = path.split("/");
  return isRole(segment) && segment !== user.role ? ROLE_HOMES[user.role] : null;
}

/** Guests opening the admin cabinet get the admin sign-in. */
export const signInRoute = (path: string) =>
  path.startsWith(`${AUTH_ROUTES.adminSignIn}/`) ? AUTH_ROUTES.adminSignIn : AUTH_ROUTES.signIn;

export const isRole = (value: string): value is Role => value in ROLE_NAMES;

export function parseLocation(path: string): ShellLocation {
  const [, segment = "", screen] = path.split("/");
  const role = segment || "broker";
  return isRole(role)
    ? { role, validRole: true, screen }
    : { role: "broker", validRole: false, screen };
}

export const mainKey = (role: Role, screen: string | undefined, route: Route) =>
  `${role}-${screen}-${screen === "workspace" ? route.params.get("company") || "" : ""}`;

export const panelsKey = (role: Role, route: Route) =>
  `${role}-${route.params.get("panel")}-${route.params.get("object")}`;

export const getPopupContainer = (trigger?: HTMLElement) =>
  trigger?.closest<HTMLElement>("[role=dialog]") ?? document.body;

export function applyImageFallback(event: SyntheticEvent) {
  const img = event.target;
  if (img instanceof HTMLImageElement && !img.src.endsWith("property-fallback.svg"))
    img.src = asset(FALLBACK_IMAGE);
}
