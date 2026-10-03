import { useGetMeQuery } from "../../api/auth-api-ts/authApi";
import { notifySuccess } from "../../components/toaster";
import { Panels } from "../../features/panels";
import { useRoute } from "../router";
import { applyImageFallback, mainKey, panelsKey, parseLocation } from "../utils/helpers";
import { Header } from "./Header";
import { RouteContent } from "./RouteContent";

export function WorkspaceShell() {
  const route = useRoute();
  useGetMeQuery();
  const location = parseLocation(route.path);
  const { role, validRole, screen } = location;

  return (
    <div
      className="flex h-dvh flex-col overflow-hidden"
      onErrorCapture={applyImageFallback}
    >
      {validRole && <Header role={role} screen={screen} />}
      <main
        className="min-h-0 flex-1 overflow-auto"
        key={mainKey(role, screen, route)}
      >
        <RouteContent route={route} location={location} onSuccess={notifySuccess} />
      </main>
      {validRole && (
        <Panels key={panelsKey(role, route)} role={role} toast={notifySuccess} />
      )}
    </div>
  );
}
