export type Role = "broker" | "partner" | "admin";
export interface Actor {
  role: Role;
  companyId?: string;
}
export type RequestStage =
  | "created"
  | "pending_review"
  | "rejected"
  | "in_progress"
  | "has_offers"
  | "crm"
  | "sold";
export type PropertyAvailability = "active" | "draft" | "sold";
export type OfferState =
  | "sent"
  | "interested"
  | "transferred"
  | "closed"
  | "unavailable";
export type OfferReview = "pending" | "approved" | "rejected";
export type PropertyType =
  | "Квартира"
  | "Студия"
  | "Дом"
  | "Пентхаус"
  | "Участок"
  | "Коммерция";
export interface Company {
  id: string;
  kind: "rf" | "am";
  name: string;
  contact: string;
}
export interface Employee {
  id: string;
  companyId: string;
  name: string;
  phone: string;
  active: boolean;
}
export interface Client {
  id: string;
  publicId: string;
  companyId: string;
  employeeId: string;
  name: string;
  phone: string;
  email: string;
}
export interface Request {
  id: string;
  clientId: string;
  stage: RequestStage;
  districts: string[];
  budgetMin: number;
  budgetMax: number;
  areaMin: number;
  areaMax: number;
  rooms: number | null;
  type: PropertyType;
  goal: string;
  term: string;
  notes: string;
  market: string;
  repair: string;
  furniture: string;
  parking: string;
  view: string;
  amenities: string[];
  submittedAt: string | null;
  /** Admin's reason for the latest rejection; cleared on resubmit. */
  rejectReason: string | null;
  reviewedAt: string | null;
  createdAt: string;
}
export interface Property {
  id: string;
  companyId: string;
  availability: PropertyAvailability;
  title: string;
  type: PropertyType;
  district: string;
  price: number;
  area: number;
  rooms: number | null;
  floor: number | null;
  floors: number | null;
  ceiling: number | null;
  market: string;
  /** Public landmark; the exact street address stays in `internalAddress`. */
  location: string;
  repair: string;
  furniture: string;
  parking: string;
  bathroom: string;
  balcony: string;
  building: string;
  amenities: string[];
  description: string;
  privateNotes: string;
  internalAddress: string;
  media: string[];
}
export interface Offer {
  id: string;
  requestId: string;
  propertyId: string;
  companyId: string;
  state: OfferState;
  disposition: "neutral" | "rejected";
  closeReason?: "sold" | "not_selected";
  matchScore: number;
  /** Admin review; brokers only ever receive approved offers. */
  review: OfferReview;
  /** Its property is held by another request's active reservation. */
  reservedElsewhere?: boolean;
  /** Admin's reason for the latest rejection; cleared on resubmit. */
  rejectReason: string | null;
  reviewedAt: string | null;
  createdAt: string;
}
export interface Transfer {
  id: string;
  requestId: string;
  offerIds: string[];
  state: "demo_transferred" | "returned" | "sold";
  soldPropertyId?: string;
  /** Admin's reason for returning it; null for partners. */
  returnReason: string | null;
  createdAt: string;
}
export interface DemoEvent {
  id: string;
  type:
    | "offers_sent"
    | "interest"
    | "transferred"
    | "returned"
    | "sold"
    | "started"
    | "request_submitted"
    | "request_approved"
    | "request_rejected"
    | "offer_submitted"
    | "offer_rejected";
  requestId: string;
  propertyId?: string;
  createdAt: string;
}
export interface DemoState {
  companies: Company[];
  employees: Employee[];
  clients: Client[];
  requests: Request[];
  properties: Property[];
  offers: Offer[];
  transfers: Transfer[];
  drafts: Record<string, string[]>;
  events: DemoEvent[];
  error?: string;
}
export type DemoAction =
  | { type: "READ_EVENT"; actor: Actor; eventId: string }
  | { type: "READ_ALL_EVENTS"; actor: Actor }
  | { type: "INTEREST"; actor: Actor; offerId: string; selected?: boolean }
  | { type: "REJECT" | "RESTORE"; actor: Actor; offerId: string }
  | {
      type: "DRAFT_TOGGLE";
      actor: Actor;
      requestId: string;
      propertyId: string;
    }
  | {
      type: "SEND_OFFERS";
      actor: Actor;
      requestId: string;
      propertyIds?: string[];
    }
  | {
      type: "TRANSFER";
      actor: Actor;
      requestId: string;
    }
  | { type: "RETURN"; actor: Actor; transferId: string; reason: string }
  | { type: "SELL"; actor: Actor; transferId: string; propertyId: string }
  | { type: "SUBMIT"; actor: Actor; requestId: string }
  | { type: "APPROVE_OFFER" | "RESUBMIT_OFFER"; actor: Actor; offerId: string }
  | { type: "DECLINE_OFFER"; actor: Actor; offerId: string; reason: string }
  | { type: "APPROVE_REQUEST"; actor: Actor; requestId: string }
  | {
      type: "REJECT_REQUEST";
      actor: Actor;
      requestId: string;
      reason: string;
    };
