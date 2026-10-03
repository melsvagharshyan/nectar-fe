import { Toaster } from "sonner";
import { useTheme } from "../../utils/hooks";
import { TOAST_CLASSNAMES, TOAST_DURATION_MS } from "./constants";
import { ToastIcon } from "./ToastIcon";

const ICONS = {
  success: <ToastIcon kind="success" />,
  error: <ToastIcon kind="error" />,
  warning: <ToastIcon kind="warning" />,
  info: <ToastIcon kind="info" />,
  loading: <ToastIcon kind="loading" />,
};

export function AppToaster() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme}
      position="bottom-right"
      offset={20}
      mobileOffset={12}
      gap={10}
      visibleToasts={4}
      duration={TOAST_DURATION_MS}
      closeButton
      icons={ICONS}
      toastOptions={{ unstyled: true, classNames: TOAST_CLASSNAMES }}
    />
  );
}
