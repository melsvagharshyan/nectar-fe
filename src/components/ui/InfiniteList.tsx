import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../../utils/helpers";

const LOAD_AHEAD = "240px";

/** Renders a list and asks for the next page when its end scrolls into view. */
export function InfiniteList({
  children,
  hasMore,
  loading,
  onLoadMore,
  className,
  endText,
}: {
  children: ReactNode;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  className?: string;
  endText?: string;
}) {
  const sentinel = useRef<HTMLDivElement>(null);
  const load = useRef(onLoadMore);
  useEffect(() => {
    load.current = onLoadMore;
  });

  useEffect(() => {
    const el = sentinel.current;
    if (!el || !hasMore || loading) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && load.current(),
      { rootMargin: LOAD_AHEAD },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div className={className}>
      {children}
      <div ref={sentinel} aria-hidden className="h-1" />
      {loading && (
        <div className="flex items-center justify-center gap-8 py-12 text-[12px] text-muted" role="status">
          <span className="size-14 animate-spin rounded-full border-2 border-line border-t-accent" />
          Загружаем ещё…
        </div>
      )}
      {!hasMore && !loading && endText && (
        <p className={cn("m-0 py-12 text-center text-[11px] text-faint")}>{endText}</p>
      )}
    </div>
  );
}
