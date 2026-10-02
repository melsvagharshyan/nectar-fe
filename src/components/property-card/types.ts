export interface PropertyCardData {
  id: string;
  title: string;
  district: string;
  price: number;
  area: number;
  rooms?: number | null;
  floor?: number | null;
  floors?: number | null;
  ceiling?: number | null;
  availability: string;
  description: string;
  media: string[];
  type: string;
  location?: string;
  repair?: string;
  bathroom?: string;
  balcony?: string;
  building?: string;
}

export type PropertyCardVariant = "immersive" | "compact" | "row";

/** Screen the compact card is rendered on; immersive cards only live in the broker carousel. */
export type PropertyCardContext = "default" | "partner" | "editor";

export type PhotoTagKind = "plain" | "date" | "extra";

export interface PropertySpec {
  label: string;
  value: string;
}
