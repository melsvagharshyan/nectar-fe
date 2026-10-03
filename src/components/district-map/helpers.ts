import type { ExpressionSpecification } from "maplibre-gl";
import { money, plural } from "../../utils/helpers";
import type { DistrictStats } from "./types";

type PaintValue = string | number | ExpressionSpecification;

export const byState = (
  state: "selected" | "hover",
  yes: PaintValue,
  no: PaintValue,
): ExpressionSpecification => ["case", ["boolean", ["feature-state", state], false], yes, no];

const OBJECT_FORMS = ["объект", "объекта", "объектов"] as const;

export function describeStats(stats?: DistrictStats) {
  if (!stats?.count) return "Пока нет объектов в базе";
  const from = stats.minPrice ? ` · от ${money(stats.minPrice)}` : "";
  return `${stats.count} ${plural(stats.count, OBJECT_FORMS)}${from}`;
}
