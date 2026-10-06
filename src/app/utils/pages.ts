import { lazy } from "react";

export const ObjectEditor = lazy(() =>
  import("../../features/object-editor").then((m) => ({ default: m.ObjectEditor })),
);
export const AdminWorkspace = lazy(() =>
  import("../../pages/admin-workspace").then((m) => ({ default: m.AdminWorkspace })),
);
export const Analytics = lazy(() =>
  import("../../pages/analytics").then((m) => ({ default: m.Analytics })),
);
export const Catalog = lazy(() =>
  import("../../pages/catalog").then((m) => ({ default: m.Catalog })),
);
export const Companies = lazy(() =>
  import("../../pages/companies").then((m) => ({ default: m.Companies })),
);
export const PartnerOffers = lazy(() =>
  import("../../pages/partner-offers").then((m) => ({ default: m.PartnerOffers })),
);
export const PartnerWorkspace = lazy(() =>
  import("../../pages/partner-workspace").then((m) => ({ default: m.PartnerWorkspace })),
);
export const Registrations = lazy(() =>
  import("../../pages/registrations").then((m) => ({ default: m.Registrations })),
);
export const Profile = lazy(() =>
  import("../../pages/profile").then((m) => ({ default: m.Profile })),
);
export const Settings = lazy(() =>
  import("../../pages/settings").then((m) => ({ default: m.Settings })),
);
export const Workspace = lazy(() =>
  import("../../pages/workspace").then((m) => ({ default: m.Workspace })),
);
