import type { Role } from "../../../demo/types";

export interface PanelProps {
  role: Role;
  toast: (message: string) => void;
}

export type NotificationFilter = "all" | "new" | "attention" | "crm";

export type DirectoryTab = "clients" | "requests";

export type TransferConfirmMode = "sold" | "return";

export interface TransferConfirmValues {
  soldPropertyId: string;
}

export interface OfferStatusItem {
  id: string;
  linkLabel: string;
  status: string;
  onOpen: () => void;
}
