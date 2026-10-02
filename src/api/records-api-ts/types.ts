export interface ClientPayload {
  name: string;
  phone: string;
  email: string;
  employeeId: string;
}

export interface RequestPayload {
  type: string;
  districts: string[];
  budgetMin: number;
  budgetMax: number;
  areaMin: number;
  areaMax: number;
  rooms: number | null;
  goal: string;
  term: string;
  notes: string;
  market: string;
  repair: string;
  furniture: string;
  parking: string;
  view: string;
  amenities: string[];
}

export interface PropertyPayload {
  /** `true` publishes to the base, `false` keeps a draft. */
  publish: boolean;
  type: string;
  district: string;
  price: number;
  area: number;
  rooms: number | null;
  floor: number | null;
  floors: number | null;
  ceiling: number | null;
  market: string;
  location: string;
  internalAddress: string;
  description: string;
  privateNotes: string;
  repair: string;
  furniture: string;
  parking: string;
  bathroom: string;
  balcony: string;
  building: string;
  amenities: string[];
  media: string[];
}

export interface CompanyPayload {
  kind: "rf" | "am";
  name: string;
  contact: string;
}

export interface EmployeePayload {
  name: string;
  phone: string;
  active: boolean;
}

export interface WithId<T> {
  id: string;
  body: T;
}

export interface UploadResponse {
  url: string;
}
