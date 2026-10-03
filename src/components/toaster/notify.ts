import { toast } from "sonner";
import { ERROR_TOAST_DURATION_MS, UNDO_TOAST_DURATION_MS } from "./constants";

export interface NotifyOptions {
  description?: string;
  action?: { label: string; onClick: () => void };
}

const withAction = ({ description, action }: NotifyOptions = {}) => ({
  description,
  ...(action
    ? {
        duration: UNDO_TOAST_DURATION_MS,
        action: { label: action.label, onClick: () => action.onClick() },
      }
    : {}),
});

export const notify = {
  success: (title: string, options?: NotifyOptions) => toast.success(title, withAction(options)),
  info: (title: string, options?: NotifyOptions) => toast.info(title, withAction(options)),
  warning: (title: string, options?: NotifyOptions) => toast.warning(title, withAction(options)),
  error: (title: string, options?: NotifyOptions) =>
    toast.error(title, { duration: ERROR_TOAST_DURATION_MS, ...withAction(options) }),
};

/** Callback form for components that report a finished action as `(title, description?)`. */
export const notifySuccess = (title: string, description?: string) => {
  notify.success(title, { description });
};
