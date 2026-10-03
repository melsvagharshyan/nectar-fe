import type { PropertyCardData } from "../../../components/property-card";
import { Button, Overlay } from "../../../components/ui";
import { cn, coverImage } from "../../../utils/helpers";
import { ROW } from "../../../utils/styles";

export function PropertyGallery({
  property,
  photo,
  onPhotoChange,
  onClose,
}: {
  property: PropertyCardData;
  photo: number;
  onPhotoChange: (index: number) => void;
  onClose: () => void;
}) {
  const count = property.media.length;
  return (
    <Overlay
      title={`Галерея ${property.id} · ${photo + 1} / ${Math.max(1, count)}`}
      modal
      wide
      onClose={onClose}
    >
      <img
        className="m-auto block max-h-[65vh] max-w-full object-contain"
        src={coverImage(property.media, photo)}
        decoding="async"
        alt={property.title + " · фото " + (photo + 1)}
      />
      {count > 1 && (
        <div className={cn(ROW, "justify-between mt-20")}>
          <Button onClick={() => onPhotoChange((photo + count - 1) % count)}>
            ← Предыдущее
          </Button>
          <Button onClick={() => onPhotoChange((photo + 1) % count)}>
            Следующее →
          </Button>
        </div>
      )}
    </Overlay>
  );
}
