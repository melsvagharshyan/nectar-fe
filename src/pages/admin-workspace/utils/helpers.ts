import type { DemoState } from "../../../demo/types";

export const companyName = (state: DemoState, companyId?: string) =>
  state.companies.find((c) => c.id === companyId)?.name;
