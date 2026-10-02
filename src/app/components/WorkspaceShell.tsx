import { useEffect } from "react";
import { useGetMeQuery } from "../../api/auth-api-ts/authApi";
import { Panels } from "../../features/panels";
import { useDemo } from "../DemoProvider";
import { useRoute } from "../router";
import { applyImageFallback, mainKey, panelsKey, parseLocation } from "../utils/helpers";
import { useToast } from "../utils/hooks";
import { Header } from "./Header";
import { RouteContent } from "./RouteContent";
import { Toast } from "./Toast";

export function WorkspaceShell() {
  const route = useRoute();
  const [state] = useDemo();
  const { message, showToast } = useToast();
  useGetMeQuery();
  const location = parseLocation(route.path);
  const { role, validRole, screen } = location;

  useEffect(() => {
    if (state.error) showToast(state.error);
  }, [state.error, showToast]);

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
        <RouteContent route={route} location={location} onSuccess={showToast} />
      </main>
      {validRole && (
        <Panels key={panelsKey(role, route)} role={role} toast={showToast} />
      )}
      <Toast message={message} />
    </div>
  );
}
