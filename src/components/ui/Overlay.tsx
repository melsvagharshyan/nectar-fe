import { useRef, useState, type ReactNode } from "react";
import { cn } from "../../utils/helpers";
import { useDialogFocus } from "../../utils/hooks";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { OverlayFooterContext } from "./overlayContext";

export function Overlay({
  title,
  children,
  onClose,
  wide = false,
  modal = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
  modal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [footer, setFooter] = useState<HTMLDivElement | null>(null);
  useDialogFocus(ref, onClose);
  return (
    <div
      className={cn(
        "overlay fixed inset-0 z-100 flex justify-end bg-[#0f172a66] backdrop-blur-[3px] dark:bg-[#000000a0]",
        modal && "modal z-120 items-center justify-center p-16",
      )}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "drawer flex h-full w-[min(580px,100%)] flex-col border-l border-line bg-surface text-ink shadow-drawer outline-none",
          wide && "wide w-[min(840px,100%)]",
          modal &&
            "h-auto max-h-[90dvh] w-[min(580px,100%)] overflow-hidden rounded-[18px] border shadow-raised",
        )}
      >
        <div className="drawer-head flex shrink-0 items-center justify-between gap-15 border-b border-line px-24 py-18 max-xs:px-18 max-xs:py-14">
          <h2>{title}</h2>
          <Button iconOnly aria-label="Закрыть панель" onClick={onClose}>
            <Icon name="close" />
          </Button>
        </div>
        <OverlayFooterContext value={footer}>
          <div className="drawer-body min-h-0 flex-1 overflow-auto p-24 max-xs:p-18">
            {children}
          </div>
        </OverlayFooterContext>
        <div
          ref={setFooter}
          className="drawer-footer flex shrink-0 flex-wrap items-center gap-10 border-t border-line bg-surface px-24 py-16 empty:hidden max-xs:px-18 max-xs:py-12"
        />
      </div>
    </div>
  );
}
