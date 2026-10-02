import { useRef, useState, type ReactNode, type Ref } from "react";
import { Button } from "../ui";
import { cn } from "../../utils/helpers";

const IMAGE_TYPES = "image/jpeg,image/png,image/webp,image/avif";

/** Button that opens the file picker and also accepts dropped image files. */
export function ImageUploadButton({
  children,
  disabled,
  invalid,
  name,
  buttonRef,
  onFiles,
}: {
  children: ReactNode;
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

  return (
    <>
      <Button
        ref={buttonRef}
        name={name}
        disabled={disabled}
        aria-invalid={invalid}
        className={cn("min-h-64 border-dashed", dragging && "border-accent bg-accent-tint")}
        onClick={() => input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) accept(e.dataTransfer.files);
        }}
      >
        {children}
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
