import { Controller, useFormContext } from "react-hook-form";
import { ImageUploadButton } from "../../../components/form";
import type { PropertyFormValues } from "../utils/types";
import { MediaThumb } from "./MediaThumb";
import { BOX, ERROR_BOX, FIELD, FORM_GRID } from "../../../utils/styles";
import { SECTION, SECTION_TITLE } from "../utils/styles";
import { cn } from "../../../utils/helpers";

export function MediaSection({
  uploading,
  uploadError,
  onUpload,
}: {
  uploading: boolean;
  uploadError?: string;
  onUpload: (files: File[]) => void;
}) {
  const { control } = useFormContext<PropertyFormValues>();
  return (
    <Controller
      control={control}
      name="media"
      render={({ field, fieldState }) => (
        <section className={cn(FIELD, SECTION)}>
          <h2 className={SECTION_TITLE}>МЕДИА И ФОТО</h2>
          <div className={FORM_GRID}>
            {field.value.map((src, i) => (
              <MediaThumb
                key={src}
                src={src}
                index={i}
                onMakeCover={() =>
                  field.onChange([src, ...field.value.filter((p) => p !== src)])
                }
                onRemove={() =>
                  field.onChange(field.value.filter((p) => p !== src))
                }
              />
            ))}
          </div>
          {!field.value.length && <p className={BOX}>Фото пока не добавлены</p>}
          {fieldState.error && (
            <small role="alert">{fieldState.error.message}</small>
          )}
          {uploadError && (
            <p className={ERROR_BOX} role="alert">
              {uploadError}
            </p>
          )}
          <ImageUploadButton
            buttonRef={field.ref}
            name="media"
            invalid={!!fieldState.error}
            disabled={uploading}
            onFiles={onUpload}
          >
            {uploading ? "Загрузка фото…" : "Нажмите или перетащите фото"}
          </ImageUploadButton>
        </section>
      )}
    />
  );
}
