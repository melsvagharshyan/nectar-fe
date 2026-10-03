import type { ExpressionSpecification } from "maplibre-gl";
import { money } from "../../utils/helpers";
import type { DistrictStats } from "./types";

type PaintValue = string | number | ExpressionSpecification;

export const byState = (
  state: "selected" | "hover",
  yes: PaintValue,
  no: PaintValue,
): ExpressionSpecification => ["case", ["boolean", ["feature-state", state], false], yes, no];

const OBJECT_FORMS = ["объект", "объекта", "объектов"] as const;

export function pluralObjects(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return OBJECT_FORMS[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return OBJECT_FORMS[1];
  return OBJECT_FORMS[2];
}

export function describeStats(stats?: DistrictStats) {
  if (!stats?.count) return "Пока нет объектов в базе";
  const from = stats.minPrice ? ` · от ${money(stats.minPrice)}` : "";
  return `${stats.count} ${pluralObjects(stats.count)}${from}`;
}
