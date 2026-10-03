import { useEffect, useState } from "react";
const subscribers = new Set<() => void>();
const currentUrl = () => location.pathname + location.search;
const notify = () => subscribers.forEach((fn) => fn());

if (location.hash.startsWith("#/")) {
  history.replaceState(null, "", location.hash.slice(1));
}

let acceptedUrl = currentUrl();

const allowNavigation = (target: string) =>
  window.dispatchEvent(
    new CustomEvent("nectar:navigate", { cancelable: true, detail: { target } }),
  );

const handlePopState = () => {
  const target = currentUrl();
  if (target === acceptedUrl) return;
  if (!allowNavigation(target)) {
    history.pushState(null, "", acceptedUrl);
    return;
  }
  acceptedUrl = target;
  notify();
};
window.addEventListener("popstate", handlePopState);
if (import.meta.hot)
  import.meta.hot.dispose(() =>
    window.removeEventListener("popstate", handlePopState),
  );

export function readRoute() {
  return { path: location.pathname || "/", params: new URLSearchParams(location.search) };
}

/** Pushes a URL without asking the unsaved-changes guard. */
export function go(target: string) {
  if (target === currentUrl()) return;
  history.pushState(null, "", target);
  acceptedUrl = target;
  notify();
}

/** Replaces the current route without a history entry or the unsaved-changes guard. */
export function redirect(path: string) {
  history.replaceState(null, "", path);
  acceptedUrl = currentUrl();
  notify();
}

export function navigate(
  path: string,
  params: Record<string, string | undefined> = {},
) {
  const q = new URLSearchParams(
    Object.entries(params).filter((x): x is [string, string] => !!x[1]),
  );
  const target = path + (q.size ? "?" + q : "");
  if (allowNavigation(target)) go(target);
}

export function useRoute() {
  const [route, set] = useState(readRoute);
  useEffect(() => {
    const fn = () => set(readRoute());
    subscribers.add(fn);
    return () => {
      subscribers.delete(fn);
    };
  }, []);
  return route;
}

export function panel(
  name: string,
  extra: Record<string, string | undefined> = {},
) {
  const r = readRoute();
  navigate(r.path, {
    ...Object.fromEntries(r.params),
    panel: name,
    mode: undefined,
    employee: undefined,
    object: undefined,
    ...extra,
  });
}

export function closePanel() {
  const r = readRoute();
  r.params.delete("panel");
  r.params.delete("object");
  r.params.delete("mode");
  r.params.delete("employee");
  navigate(r.path, Object.fromEntries(r.params));
}
