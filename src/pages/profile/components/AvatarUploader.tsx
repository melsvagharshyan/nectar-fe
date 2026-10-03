import { useRef, useState, type ReactNode } from "react";
import { FiCamera, FiLoader, FiTrash2, FiUploadCloud } from "react-icons/fi";
import type { UserDto } from "../../../api/auth-api-ts/types";
import { Avatar, Button } from "../../../components/ui";
import { cn } from "../../../utils/helpers";
import { AVATAR_HINT, AVATAR_TYPES } from "../utils/constants";
import { useAvatar } from "../utils/hooks";

/** `children` render between the photo and its actions (e.g. the user's name). */
export function AvatarUploader({ user, children }: { user: UserDto; children?: ReactNode }) {
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const { upload, remove, uploading, removing } = useAvatar(user);
  const busy = uploading || removing;
  const pick = () => input.current?.click();
  const accept = (files: FileList | null) => {
    const file = files?.[0];
    if (file) void upload(file);
  };

  return (
    <div className="flex flex-col items-center gap-14">
      <div
        className={cn(
          "relative rounded-full transition-shadow",
          dragging && "ring-4 ring-accent ring-offset-4 ring-offset-surface",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          if (!busy) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!busy) accept(e.dataTransfer.files);
        }}
      >
        <Avatar
          name={user.name}
          src={user.avatarUrl ?? undefined}
          className="size-112 text-[32px] ring-4 ring-surface shadow-[0_12px_30px_-14px_rgb(15_23_42/0.45)]"
        />
        {busy && (
          <span className="absolute inset-0 z-2 grid place-items-center rounded-full bg-slate-900/45 text-white">
            <FiLoader className="size-24 animate-spin" aria-label="Обновляем фото" />
          </span>
        )}
        <Button
          variant="primary"
          iconOnly
          className="absolute right-0 bottom-2 z-3 size-34 rounded-full border-2 border-surface p-0"
          aria-label="Загрузить новое фото"
          disabled={busy}
          onClick={pick}
        >
          <FiCamera />
        </Button>
      </div>
      <input
        ref={input}
        type="file"
        accept={AVATAR_TYPES.join(",")}
        className="hidden"
        onChange={(e) => {
          accept(e.target.files);
          e.target.value = "";
        }}
      />
      {children}
      <div className="flex flex-wrap justify-center gap-8">
        <Button variant="secondary" disabled={busy} onClick={pick}>
          <FiUploadCloud aria-hidden />
          {uploading ? "Загружаем…" : user.avatarUrl ? "Заменить фото" : "Загрузить фото"}
        </Button>
        {user.avatarUrl && (
          <Button variant="ghost" disabled={busy} onClick={() => void remove()}>
            <FiTrash2 aria-hidden />
            Удалить
          </Button>
        )}
      </div>
      <p className="max-w-260 text-center text-[11px] leading-[1.5] text-faint">{AVATAR_HINT}</p>
    </div>
  );
}
