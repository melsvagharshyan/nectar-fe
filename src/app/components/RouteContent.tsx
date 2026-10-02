import { EDITOR_PAGE, ObjectEditor } from "../../features/object-editor";
import { AdminWorkspace } from "../../pages/admin-workspace";
import { Analytics } from "../../pages/analytics";
import { Catalog } from "../../pages/catalog";
import { Companies } from "../../pages/companies";
import { PartnerOffers } from "../../pages/partner-offers";
import { PartnerWorkspace } from "../../pages/partner-workspace";
import { Settings } from "../../pages/settings";
import { Workspace } from "../../pages/workspace";
import { ROLE_HOMES } from "../../utils/constants";
import { navigate } from "../router";
import type { Route, ShellLocation } from "../utils/types";
import { NotFound } from "./NotFound";
import { PAGE } from "../../utils/styles";
import { cn } from "../../utils/helpers";

export function RouteContent({
  route,
  location: { role, validRole, screen },
  onSuccess,
}: {
  route: Route;
  location: ShellLocation;
  onSuccess: (message: string) => void;
}) {
  if (!validRole)
    return <NotFound actionLabel="Вернуться в кабинет" target="/" />;
  if (screen === "settings") return <Settings role={role} />;
  if (screen === "analytics") return <Analytics role={role} />;
  if (screen === "objects" && route.path.endsWith("/new") && role === "partner")
    return (
      <div className={cn(PAGE, EDITOR_PAGE)}>
        <ObjectEditor
          embedded
          propertyId={route.params.get("object") || undefined}
          onClose={() => navigate("/partner/objects")}
          onSuccess={onSuccess}
        />
      </div>
    );
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
