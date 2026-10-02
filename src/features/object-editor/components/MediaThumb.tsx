import { Button } from "../../../components/ui";
import { mediaUrl } from "../../../utils/helpers";
import { BOX, CHIPS } from "../../../utils/styles";

const THUMB_STYLE = {
  width: "100%",
  height: 100,
  objectFit: "cover",
  borderRadius: 10,
} as const;

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
    <div className={BOX}>
      <img src={mediaUrl(src)} alt={`Фото ${index + 1}`} style={THUMB_STYLE} />
      <div className={CHIPS}>
        <Button disabled={isCover} onClick={onMakeCover}>
          {isCover ? "Обложка" : "Сделать обложкой"}
        </Button>
        <Button onClick={onRemove}>Убрать</Button>
      </div>
    </div>
  );
}
