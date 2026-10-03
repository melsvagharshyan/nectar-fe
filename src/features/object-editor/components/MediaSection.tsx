import { Controller, useFormContext } from "react-hook-form";
import { ImageUploadButton } from "../../../components/form";
import { cn } from "../../../utils/helpers";
import { FIELD } from "../../../utils/styles";
import { MEDIA_UPLOAD_HINT } from "../utils/constants";
import { SECTION, SECTION_TITLE } from "../utils/styles";
import type { PropertyFormValues } from "../utils/types";
import { MediaThumb } from "./MediaThumb";

export function MediaSection({
  uploading,
  onUpload,
}: {
  uploading: boolean;
  onUpload: (files: File[]) => void;
}) {
  const { control } = useFormContext<PropertyFormValues>();
  return (
    <Controller
      control={control}
      name="media"
      render={({ field, fieldState }) => {
        const count = field.value.length;
        return (
          <section className={cn(FIELD, SECTION)}>
            <h2 className={SECTION_TITLE}>
              Медиа и фото
              {count > 0 && (
                <span className="ml-auto text-[12px] font-medium text-muted">{count} фото</span>
              )}
            </h2>
            {count > 0 && (
              <div className="mb-12 grid grid-cols-3 gap-10 max-sm:grid-cols-2">
                {field.value.map((src, i) => (
                  <MediaThumb
                    key={src}
                    src={src}
                    index={i}
                    onMakeCover={() =>
                      field.onChange([src, ...field.value.filter((p) => p !== src)])
                    }
                    onRemove={() => field.onChange(field.value.filter((p) => p !== src))}
                  />
                ))}
              </div>
            )}
            <ImageUploadButton
              buttonRef={field.ref}
              name="media"
              compact={count > 0}
              title={count > 0 ? "Добавить ещё фото" : "Загрузите фото объекта"}
              hint={count > 0 ? MEDIA_UPLOAD_HINT.more : MEDIA_UPLOAD_HINT.empty}
              invalid={!!fieldState.error}
              uploading={uploading}
              onFiles={onUpload}
            />
            {fieldState.error && (
              <small role="alert" className="mt-8 block">
                {fieldState.error.message}
              </small>
            )}
          </section>
        );
      }}
    />
  );
}
