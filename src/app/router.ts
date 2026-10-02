import { useEffect, useState } from "react";
const subscribers = new Set<() => void>();
let acceptedHash = location.hash;
const handleHash = () => {
  const target = location.hash;
  if (target === acceptedHash) return;
  const event = new CustomEvent("nectar:navigate", {
    cancelable: true,
    detail: { target },
  });
  if (!window.dispatchEvent(event)) {
    history.replaceState(null, "", acceptedHash || "#/");
    return;
  }
  acceptedHash = target;
  subscribers.forEach((notify) => notify());
};
window.addEventListener("hashchange", handleHash);
if (import.meta.hot)
  import.meta.hot.dispose(() =>
    window.removeEventListener("hashchange", handleHash),
  );
export function readRoute() {
  const [path, query = ""] = location.hash.slice(1).split("?");
  return { path: path || "/", params: new URLSearchParams(query) };
}
/** Replaces the current route without a history entry or the unsaved-changes guard. */
export function redirect(path: string) {
  location.replace("#" + path);
}
export function navigate(
  path: string,
  params: Record<string, string | undefined> = {},
) {
  const q = new URLSearchParams(
    Object.entries(params).filter((x): x is [string, string] => !!x[1]),
  );
  const target = "#" + path + (q.size ? "?" + q : "");
  const event = new CustomEvent("nectar:navigate", {
    cancelable: true,
    detail: { target },
  });
  if (window.dispatchEvent(event)) location.hash = target;
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
