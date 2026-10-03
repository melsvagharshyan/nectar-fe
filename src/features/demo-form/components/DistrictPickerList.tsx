import { FiCheck } from "react-icons/fi";
import type { DistrictStatsMap } from "../../../components/district-map";
import { Button } from "../../../components/ui";
import { DISTRICTS } from "../../../utils/constants";
import { cn } from "../../../utils/helpers";
import {
  DISTRICT_CHECK,
  DISTRICT_CHECK_SELECTED,
  DISTRICT_ITEM,
  DISTRICT_ITEM_SELECTED,
} from "../utils/constants";

export function DistrictPickerList({
  selected,
  stats,
  onToggle,
}: {
  selected: string[];
  stats: DistrictStatsMap;
  onToggle: (district: string) => void;
}) {
  return (
    <div className="flex min-h-0 flex-col gap-8">
      <p className="m-0 text-[12px] font-semibold text-muted">
        Выбрано: <span className="text-ink">{selected.length}</span> из {DISTRICTS.length}
      </p>
      <ul className="m-0 flex min-h-0 list-none flex-col gap-2 overflow-auto p-0 max-lg:grid max-lg:grid-cols-2 max-xs:grid-cols-1">
        {DISTRICTS.map((district) => {
          const active = selected.includes(district);
          const count = stats[district]?.count ?? 0;
          return (
            <li key={district}>
              <Button
                variant="ghost"
                className={cn(DISTRICT_ITEM, active && DISTRICT_ITEM_SELECTED)}
                aria-pressed={active}
                onClick={() => onToggle(district)}
              >
                <span className="flex items-center gap-8">
                  <span className={cn(DISTRICT_CHECK, active && DISTRICT_CHECK_SELECTED)}>
                    {active && <FiCheck className="size-11" strokeWidth={3} />}
                  </span>
                  {district}
                </span>
                <span className="text-[11px] font-normal text-faint">{count || "—"}</span>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
