import { Suspense } from "react";
import { Empty } from "../../components/ui";
import { EDITOR_PAGE } from "../../features/object-editor/utils/styles";
import { ROLE_HOMES } from "../../utils/constants";
import { navigate } from "../router";
import { PROFILE_SCREEN } from "../utils/constants";
import {
  AdminWorkspace,
  Analytics,
  Catalog,
  Companies,
  ObjectEditor,
  PartnerOffers,
  PartnerWorkspace,
  Profile,
  Settings,
  Workspace,
} from "../utils/pages";
import type { Route, ShellLocation } from "../utils/types";
import { NotFound } from "./NotFound";
import { RecordScope } from "./RecordScope";
import { PAGE } from "../../utils/styles";
import { cn } from "../../utils/helpers";

type RouteContentProps = {
  route: Route;
  location: ShellLocation;
  onSuccess: (message: string) => void;
};

export function RouteContent(props: RouteContentProps) {
  return (
    <Suspense fallback={<Empty text="Загрузка…" />}>
      <RoutePage {...props} />
    </Suspense>
  );
}

function RoutePage({
  route,
  location: { role, validRole, screen },
  onSuccess,
}: RouteContentProps) {
  if (!validRole)
    return <NotFound actionLabel="Вернуться в кабинет" target="/" />;
  if (screen === PROFILE_SCREEN) return <Profile />;
  if (screen === "settings") return <Settings role={role} />;
  if (screen === "analytics") return <Analytics role={role} />;
  if (screen === "objects" && route.path.endsWith("/new") && role === "partner") {
    const propertyId = route.params.get("object") || undefined;
    return (
      <div className={cn(PAGE, EDITOR_PAGE)}>
        <RecordScope
          role={role}
          propertyId={propertyId}
          fallback={<Empty text="Загрузка…" />}
        >
          <ObjectEditor
            embedded
            propertyId={propertyId}
            onClose={() => navigate("/partner/objects")}
            onSuccess={onSuccess}
          />
        </RecordScope>
      </div>
    );
  }
  if (screen === "objects") return <Catalog role={role} />;
  if (role === "broker" && screen === "workspace") return <Workspace />;
  if (role === "partner" && screen === "requests") return <PartnerWorkspace />;
  if (role === "partner" && screen === "offers") return <PartnerOffers />;
  if (role === "admin" && screen === "overview")
    return <Analytics role={role} overview />;
  if (role === "admin" && screen === "companies") return <Companies />;
  if (role === "admin" && screen === "workspace")
    return route.params.has("company") ? <Workspace admin /> : <AdminWorkspace />;
  return (
    <NotFound actionLabel="Вернуться в кабинет" target={ROLE_HOMES[role]} />
  );
}
