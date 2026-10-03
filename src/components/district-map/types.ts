export interface DistrictStats {
  count: number;
  minPrice: number | null;
}

export type DistrictStatsMap = Record<string, DistrictStats>;

export interface DistrictMapProps {
  selected: string[];
  onToggle: (district: string) => void;
  stats?: DistrictStatsMap;
}

export interface HoveredDistrict {
  name: string;
  x: number;
  y: number;
}
