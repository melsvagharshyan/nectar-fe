import type { IconType } from "react-icons";
import { FiAlertTriangle, FiCheck, FiInfo, FiLoader, FiX } from "react-icons/fi";
import { cn } from "../../utils/helpers";
import { TOAST_ICON_CHIP, TOAST_ICON_GRADIENTS } from "./constants";

type ToastIconKind = keyof typeof TOAST_ICON_GRADIENTS | "loading";

const ICONS: Record<ToastIconKind, IconType> = {
  success: FiCheck,
  error: FiX,
  warning: FiAlertTriangle,
  info: FiInfo,
  loading: FiLoader,
};

export function ToastIcon({ kind }: { kind: ToastIconKind }) {
  const Glyph = ICONS[kind];
  return (
    <span className={cn(TOAST_ICON_CHIP, TOAST_ICON_GRADIENTS[kind === "loading" ? "info" : kind])}>
      <Glyph className={cn("size-16", kind === "loading" && "animate-spin")} strokeWidth={2.5} />
    </span>
  );
}
