export interface MutationResult {
  ok: true;
}

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
