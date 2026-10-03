import { FiStar, FiTrash2 } from "react-icons/fi";
import { Button } from "../../../components/ui";
import { mediaUrl } from "../../../utils/helpers";

const THUMB_ACTION =
  "size-30 min-h-0 min-w-0 rounded-[8px] border-0 bg-white/90 p-0 text-[#0f172a] shadow-sm backdrop-blur hover:not-disabled:bg-white";

export function MediaThumb({
  src,
  index,
  onMakeCover,
  onRemove,
}: {
  src: string;
  index: number;
  onMakeCover: () => void;
  onRemove: () => void;
}) {
  const isCover = index === 0;
  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-[12px] border border-line bg-fill">
      <img
        src={mediaUrl(src)}
        alt={`Фото ${index + 1}`}
        className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      {isCover && (
        <span className="absolute bottom-8 left-8 flex items-center gap-4 rounded-[6px] bg-[linear-gradient(135deg,#fb923c,#ea580c)] px-8 py-3 text-[11px] font-semibold text-white shadow-sm">
          <FiStar className="size-11" />
          Обложка
        </span>
      )}
      <div className="absolute top-8 right-8 flex gap-6 opacity-100 transition-opacity md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100">
        {!isCover && (
          <Button
            iconOnly
            className={THUMB_ACTION}
            aria-label="Сделать обложкой"
            title="Сделать обложкой"
            onClick={onMakeCover}
          >
            <FiStar className="size-14" />
          </Button>
        )}
        <Button
          iconOnly
          className={`${THUMB_ACTION} hover:not-disabled:text-[#dc2626]`}
          aria-label="Удалить фото"
          title="Удалить фото"
          onClick={onRemove}
        >
          <FiTrash2 className="size-14" />
        </Button>
      </div>
    </div>
  );
}
