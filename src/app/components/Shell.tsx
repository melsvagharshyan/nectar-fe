import { useEffect } from "react";
import { SignIn } from "../../pages/sign-in";
import { SignUp } from "../../pages/sign-up";
import { UiKit } from "../../pages/ui-kit";
import { DemoProvider } from "../DemoProvider";
import { redirect, useRoute } from "../router";
import { AUTH_ROUTES } from "../utils/constants";
import { authRedirect } from "../utils/helpers";
import { useCurrentUser } from "../utils/hooks";
import { WorkspaceShell } from "./WorkspaceShell";

/** Sends guests to sign-in and keeps signed-in users inside their own role's cabinet. */
export function Shell() {
  const { path } = useRoute();
  const user = useCurrentUser();
  const target = authRedirect(path, user);

  useEffect(() => {
    if (target) redirect(target);
  }, [target]);

  if (target) return null;
  if (path === "/ui-kit") return <UiKit />;
  if (!user)
    return (
      <main className="h-dvh overflow-auto">
        {path === AUTH_ROUTES.signUp ? <SignUp /> : <SignIn />}
      </main>
    );
  return (
    <DemoProvider key={user.id}>
      <WorkspaceShell />
    </DemoProvider>
  );
}
