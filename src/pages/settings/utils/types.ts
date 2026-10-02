import type { DemoState } from "../../../demo/types";

export type Company = DemoState["companies"][number];

export type Employee = DemoState["employees"][number];

export interface SettingsFormValues {
  company: string;
}
