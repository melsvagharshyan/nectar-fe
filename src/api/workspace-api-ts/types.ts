import type { DemoState } from "../../demo/types";

/** Role-scoped snapshot returned by `GET /workspace` and by every workflow action. */
export type WorkspaceState = Omit<DemoState, "error">;

export interface InterestRequest {
  offerId: string;
  selected?: boolean;
}

export interface DraftToggleRequest {
  requestId: string;
  propertyId: string;
}

export interface SendOffersRequest {
  requestId: string;
  propertyIds?: string[];
}

export interface SellRequest {
  transferId: string;
  propertyId: string;
}
