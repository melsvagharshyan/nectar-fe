export function UnreadDot() {
  return (
    <span className="relative inline-flex size-8 shrink-0" role="img" aria-label="Не прочитано">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
      <span className="relative inline-flex size-8 rounded-full bg-accent" />
    </span>
  );
}
