import type { Theme } from "../../utils/types";

export const MAP_STYLES: Record<Theme, string> = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
};

export const SOURCE_ID = "districts";

export const LAYERS = {
  fill: "district-fill",
  line: "district-line",
  label: "district-label",
} as const;

export const ACCENT = "#f97316";

export const MAP_COLORS: Record<Theme, { fill: string; line: string; label: string; halo: string }> = {
  light: { fill: "#0f172a", line: "#64748b", label: "#0f172a", halo: "#ffffff" },
  dark: { fill: "#ffffff", line: "#94a3b8", label: "#f1f5f9", halo: "#0f172a" },
};

export const LABEL_FONT = ["Noto Sans Bold"];

export const FIT_PADDING = 28;

export const YEREVAN_BOUNDS: [[number, number], [number, number]] = [
  [44.3657, 40.0658],
  [44.6218, 40.2407],
];

export const MAX_BOUNDS: [[number, number], [number, number]] = [
  [44.18, 39.96],
  [44.82, 40.35],
];

export const DISTRICT_MAP_FRAME =
  "relative h-460 min-h-0 overflow-hidden rounded-[14px] border border-line bg-fill max-md:h-340 [&_.maplibregl-ctrl-attrib]:text-[10px]";

export const DISTRICT_HOVER_CARD =
  "pointer-events-none absolute z-2 w-max max-w-220 -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-[12px] border border-line bg-surface px-12 py-10 text-[12px] text-ink shadow-raised";
