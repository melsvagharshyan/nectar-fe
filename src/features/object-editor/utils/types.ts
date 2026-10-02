import type { FieldPathByValue } from "react-hook-form";

export interface ObjectEditorProps {
  propertyId?: string;
  onClose: () => void;
  onSuccess: (text: string) => void;
  embedded?: boolean;
}

export interface PropertyFormValues {
  type: string;
  market: string;
  district: string;
  price: string;
  area: string;
  rooms: string;
  floor: string;
  floors: string;
  ceiling: string;
  description: string;
  privateNotes: string;
  internalAddress: string;
  location: string;
  repair: string;
  furniture: string;
  parking: string;
  bathroom: string;
  balcony: string;
  building: string;
  media: string[];
  amenities: string[];
}

export type PropertyTextField = FieldPathByValue<PropertyFormValues, string>;

export type EditorTab = "form" | "preview";
