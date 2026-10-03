import { cn, initials, mediaUrl } from "../../utils/helpers";

export function Avatar({
  name,
  src,
  className,
}: {
  name: string;
  src?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex size-34 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-tint text-[11px] font-semibold text-accent-text",
        className,
      )}
    >
      {src ? (
        <img
          src={mediaUrl(src)}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute z-1 size-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
      <span>{initials(name)}</span>
    </span>
  );
}
