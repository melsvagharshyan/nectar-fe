import type { z } from "zod";
import type { kitFormSchema } from "./validations";

export interface ColorToken {
  name: string;
  variable: string;
  swatch: string;
}

export interface ColorGroup {
  title: string;
  tokens: ColorToken[];
}

export interface KitSectionLink {
  id: string;
  label: string;
}

export type KitTab = "all" | "selected" | "rejected";

export type KitOverlay = "drawer" | "modal" | null;

export type KitFormValues = z.infer<typeof kitFormSchema>;
