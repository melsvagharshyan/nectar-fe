import { lazy } from "react";

export const DistrictMap = lazy(() =>
  import("./DistrictMap").then((module) => ({ default: module.DistrictMap })),
);

export type { DistrictStats, DistrictStatsMap } from "./types";
export { describeStats } from "./helpers";
