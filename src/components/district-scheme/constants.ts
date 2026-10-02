export interface DistrictShape {
  name: string;
  points: string;
  labelX: number;
  labelY: number;
}

export const DISTRICT_SHAPES: DistrictShape[] = [
  { name: "Ачапняк", points: "30,95 130,60 160,155 75,195", labelX: 85, labelY: 130 },
  { name: "Давташен", points: "100,20 205,15 195,80 135,80", labelX: 153, labelY: 48 },
  { name: "Арабкир", points: "140,86 224,60 255,130 195,185 165,145", labelX: 191, labelY: 115 },
  { name: "Канакер-Зейтун", points: "232,27 320,50 330,125 270,140 232,85", labelX: 277, labelY: 83 },
  { name: "Аван", points: "335,35 440,70 400,155 340,123", labelX: 380, labelY: 98 },
  { name: "Кентрон", points: "170,193 258,137 325,205 265,270 170,250", labelX: 239, labelY: 212 },
  { name: "Норк-Мараш", points: "333,149 405,173 405,264 320,284 283,255 336,205", labelX: 357, labelY: 226 },
];

export const SMALL_LABEL_DISTRICT = "Канакер-Зейтун";

/** Label sizes are forced to 11px, overriding the per-label fontSize attribute. */
export const DISTRICT_MAP =
  "my-15 h-auto w-full [&_[role=button]]:cursor-pointer [&_polygon]:transition-colors [&_text]:pointer-events-none [&_text]:text-[11px] [&_text]:font-semibold";
