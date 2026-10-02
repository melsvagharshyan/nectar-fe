import type { IconType } from "react-icons";
import { cn } from "../../utils/helpers";
import {
  FiArrowRight,
  FiBarChart2,
  FiBell,
  FiBookOpen,
  FiBookmark,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiEdit2,
  FiFilter,
  FiGrid,
  FiHeart,
  FiHome,
  FiLayers,
  FiList,
  FiMapPin,
  FiMaximize,
  FiMoon,
  FiPhone,
  FiPlus,
  FiSearch,
  FiSettings,
  FiShare2,
  FiSun,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { LuBedDouble } from "react-icons/lu";

const ICONS = {
  area: FiMaximize,
  arrow: FiArrowRight,
  bed: LuBedDouble,
  book: FiBookOpen,
  bookmark: FiBookmark,
  bell: FiBell,
  calendar: FiCalendar,
  chart: FiBarChart2,
  check: FiCheck,
  chevron: FiChevronDown,
  clock: FiClock,
  close: FiX,
  deal: FiCheckCircle,
  edit: FiEdit2,
  filter: FiFilter,
  floor: FiLayers,
  grid: FiGrid,
  heart: FiHeart,
  home: FiHome,
  list: FiList,
  moon: FiMoon,
  phone: FiPhone,
  pin: FiMapPin,
  plus: FiPlus,
  search: FiSearch,
  settings: FiSettings,
  share: FiShare2,
  sun: FiSun,
  users: FiUsers,
} satisfies Record<string, IconType>;

export type IconName = keyof typeof ICONS;

export const ICON_NAMES = Object.keys(ICONS) as IconName[];

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Component = ICONS[name];
  return (
    <Component
      className={cn("icon size-18 shrink-0", className)}
      strokeWidth={1.8}
      aria-hidden="true"
    />
  );
}
