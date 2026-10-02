import type { PropertyCardData } from "../../../components/property-card";
import { Overlay } from "../../../components/ui";
import { cn, coverImage, money } from "../../../utils/helpers";
import { DETAIL_PHOTO, DETAIL_PRICE } from "../../../utils/styles";

export function PreviewDialog({
  preview,
  onClose,
}: {
  preview: PropertyCardData;
  onClose: () => void;
}) {
  return (
    <Overlay title="Предпросмотр объекта" modal wide onClose={onClose}>
      <img
        className={DETAIL_PHOTO}
        src={coverImage(preview.media)}
        alt="Фото объекта"
      />
      <h2 className="mt-20">{preview.title}</h2>
      <p className={cn(DETAIL_PRICE, "mt-20")}>{money(preview.price)}</p>
      <p>
        {preview.area} м² · {preview.district}
      </p>
      <p className="text-muted mt-20">{preview.description}</p>
    </Overlay>
  );
}
