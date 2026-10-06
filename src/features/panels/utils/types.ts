import type { Role } from "../../../demo/types";

export interface PanelProps {
  role: Role;
  toast: (title: string, description?: string) => void;
}

export type NotificationFilter =
  | "all"
  | "new"
  | "review"
  | "attention"
  | "crm";

export type DirectoryTab = "clients" | "requests";

export type TransferConfirmMode = "sold" | "return";

export interface TransferConfirmValues {
  soldPropertyId: string;
  returnReason: string;
}

export interface ReviewRejectValues {
  reason: string;
}

export interface OfferStatusItem {
  id: string;
  linkLabel: string;
  status: string;
  onOpen: () => void;
}
