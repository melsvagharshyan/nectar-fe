import { Button } from "../../../components/ui";
import { DescriptionSection } from "./DescriptionSection";
import { FeaturesSection } from "./FeaturesSection";
import { LayoutSection } from "./LayoutSection";
import { LocationSection } from "./LocationSection";
import { MediaSection } from "./MediaSection";
import { PriceSection } from "./PriceSection";
import { TypeSection } from "./TypeSection";
import { ACTIONS, EMBEDDED_PRIMARY, FIELDSET, FORM } from "../utils/styles";
import { FORM_ACTIONS } from "../../../utils/styles";
import { cn } from "../../../utils/helpers";

export interface EditorMediaUpload {
  upload: (files: File[]) => void;
  uploading: boolean;
}

export function EditorForm({
  type,
  price,
  area,
  readonly,
  embedded,
  mobileHidden,
  saving,
  media,
  onSaveDraft,
  onPublish,
  onClose,
}: {
  type: string;
  price: number;
  area: number;
  readonly: boolean;
  embedded: boolean;
  /** Below 801px only one of preview / form is shown. */
  mobileHidden: boolean;
  saving: boolean;
  media: EditorMediaUpload;
  onSaveDraft: () => void;
  onPublish: () => void;
  onClose: () => void;
}) {
  const context = embedded ? "embedded" : "overlay";
  const busy = saving || media.uploading;
  return (
    <form
      className={cn(FORM[context], mobileHidden && "max-md:hidden")}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSaveDraft();
      }}
    >
      <fieldset disabled={readonly} className={FIELDSET}>
        <TypeSection readonly={readonly} />
        <PriceSection price={price} area={area} />
        <LayoutSection type={type} readonly={readonly} />
        <FeaturesSection type={type} />
        <LocationSection />
        <DescriptionSection />
        <MediaSection
          uploading={media.uploading}
          onUpload={media.upload}
        />
      </fieldset>
      <div className={cn(FORM_ACTIONS, ACTIONS[context])}>
        <Button onClick={onClose}>Назад к списку</Button>
        {!readonly && (
          <>
            <Button type="submit" disabled={busy}>
              Сохранить черновик
            </Button>
            <Button
              variant="primary"
              className={embedded ? EMBEDDED_PRIMARY : undefined}
              disabled={busy}
              onClick={onPublish}
            >
              {saving ? "Сохранение…" : "Опубликовать в базу"}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
