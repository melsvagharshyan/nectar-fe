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

export interface RejectRequestArgs {
  requestId: string;
  reason: string;
}

export interface ReturnTransferArgs {
  transferId: string;
  reason: string;
}

export interface DeclineOfferArgs {
  offerId: string;
  reason: string;
}
