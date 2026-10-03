import { useRef, useState, type Ref } from "react";
import { FiLoader, FiUploadCloud } from "react-icons/fi";
import { Button } from "../ui";
import { cn } from "../../utils/helpers";

const IMAGE_TYPES = "image/jpeg,image/png,image/webp,image/avif";

const ICON_CHIP =
  "grid shrink-0 place-items-center rounded-[12px] bg-[linear-gradient(135deg,#fdba74_0%,#f97316_55%,#c2410c_100%)] text-white shadow-[0_10px_24px_-10px_rgb(249_115_22/0.8)] transition-transform group-hover:-translate-y-2";

/** Drop zone that opens the file picker on click and also accepts dropped image files. */
export function ImageUploadButton({
  title,
  hint,
  actionLabel = "Выбрать фото",
  uploading,
  compact,
  disabled,
  invalid,
  name,
  buttonRef,
  onFiles,
}: {
  title: string;
  hint?: string;
  actionLabel?: string;
  uploading?: boolean;
  compact?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  buttonRef?: Ref<HTMLButtonElement>;
  onFiles: (files: File[]) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const accept = (list: FileList | null) => {
    const files = [...(list ?? [])].filter((f) => f.type.startsWith("image/"));
    if (files.length) onFiles(files);
  };
  const Glyph = uploading ? FiLoader : FiUploadCloud;
  const heading = uploading ? "Загружаем фото…" : dragging ? "Отпустите, чтобы загрузить" : title;

  return (
    <>
      <Button
        ref={buttonRef}
        name={name}
        disabled={disabled || uploading}
        aria-invalid={invalid}
        className={cn(
          "group w-full rounded-[14px] border-2 border-dashed border-line-strong bg-fill/50 whitespace-normal transition-colors hover:not-disabled:border-accent hover:not-disabled:bg-accent-tint disabled:opacity-100",
          compact ? "justify-start gap-14 px-16 py-14 text-left" : "flex-col gap-10 px-20 py-28 text-center",
          dragging && "border-accent bg-accent-tint",
          invalid && "border-danger",
          uploading && "cursor-progress",
        )}
        onClick={() => input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled && !uploading) accept(e.dataTransfer.files);
        }}
      >
        <span className={cn(ICON_CHIP, compact ? "size-40" : "size-52")}>
          <Glyph className={cn(compact ? "size-18" : "size-24", uploading && "animate-spin")} />
        </span>
        <span className={cn("flex flex-col gap-4", compact && "min-w-0 flex-1")}>
          <span className="text-[14px] font-semibold text-ink">{heading}</span>
          {hint && <span className="text-[12px] font-normal text-muted">{hint}</span>}
        </span>
        {!uploading && (
          <span
            className={cn(
              "shrink-0 rounded-[8px] border border-line bg-surface px-12 py-6 text-[12px] font-semibold text-accent-text shadow-sm transition-colors group-hover:border-accent",
              !compact && "mt-4",
            )}
          >
            {actionLabel}
          </span>
        )}
      </Button>
      <input
        ref={input}
        type="file"
        accept={IMAGE_TYPES}
        multiple
        hidden
        onChange={(e) => {
          accept(e.currentTarget.files);
          e.currentTarget.value = "";
        }}
      />
    </>
  );
}
