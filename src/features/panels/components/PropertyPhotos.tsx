import type { PropertyCardData } from "../../../components/property-card";
import { Button } from "../../../components/ui";
import { coverImage, mediaUrl } from "../../../utils/helpers";
import { THUMB, THUMB_BUTTON, THUMBS } from "../utils/constants";
import { DETAIL_PHOTO } from "../../../utils/styles";

const PHOTO_BUTTON_STYLE = {
  padding: 0,
  border: 0,
  width: "100%",
  background: "none",
};

export function PropertyPhotos({
  property,
  photo,
  onPhotoChange,
  onOpenGallery,
}: {
  property: PropertyCardData;
  photo: number;
  onPhotoChange: (index: number) => void;
  onOpenGallery: () => void;
}) {
  return (
    <>
      <Button
        className="photo-button-inline"
        style={PHOTO_BUTTON_STYLE}
        onClick={onOpenGallery}
      >
        <img
          className={DETAIL_PHOTO}
          src={coverImage(property.media, photo)}
          alt={property.title}
        />
      </Button>
      <div className={THUMBS}>
        {property.media.map((src, i) => (
          <Button
            key={src}
            selected={photo === i}
            className={THUMB_BUTTON}
            aria-label={`Фото ${i + 1}`}
            onClick={() => onPhotoChange(i)}
          >
            <img className={THUMB} src={mediaUrl(src)} alt={`Кадр ${i + 1}`} />
          </Button>
        ))}
      </div>
    </>
  );
}
