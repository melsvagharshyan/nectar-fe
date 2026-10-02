import { cn, formatDate } from "../../utils/helpers";
import { Badge, Button, Icon } from "../ui";
import {
  FIRST_TAG,
  SCORE_TAG,
  TAG_KIND_CLASSES,
  TOP_BADGE,
  type CardStyles,
} from "./styles";
import type { PropertyCardData } from "./types";

const MATCH_DOT = "size-6 shrink-0 rounded-full bg-accent";

const FAVORITE =
  "pointer-events-auto ml-auto size-36 min-h-0 min-w-0 shrink-0 rounded-full border-0 bg-[#ffffffeb] p-0 text-[#0f172a] shadow-[0_1px_3px_#0f172a33] backdrop-blur-[8px] hover:not-disabled:bg-white hover:not-disabled:text-accent [&_.icon]:size-16";

const FAVORITE_SELECTED =
  "bg-accent text-white hover:not-disabled:bg-accent-hover hover:not-disabled:text-white";

export function PropertyTags({
  styles,
  property,
  score,
  date,
  selected,
  onSelect,
}: {
  styles: CardStyles;
  property: PropertyCardData;
  score?: number;
  date?: string;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <div className={styles.top}>
      <div className="flex flex-wrap items-center gap-6">
        {score !== undefined ? (
          <span
            className={cn(styles.tag, SCORE_TAG, FIRST_TAG)}
            title="Совпадение по району, бюджету, площади, комнатам и типу"
          >
            <i className={MATCH_DOT} />
            {score}% совпадение
          </span>
        ) : (
          <Badge value={property.availability} className={TOP_BADGE} />
        )}
        {date && (
          <span className={cn(styles.tag, TAG_KIND_CLASSES.date)}>
            {formatDate(date)}
          </span>
        )}
      </div>
      {onSelect && (
        <Button
          className={cn(FAVORITE, selected && FAVORITE_SELECTED)}
          selected={selected}
          aria-label={(selected ? "Снять выбор " : "Выбрать ") + property.id}
          aria-pressed={!!selected}
          onClick={onSelect}
        >
          <Icon name={selected ? "check" : "heart"} />
        </Button>
      )}
    </div>
  );
}
