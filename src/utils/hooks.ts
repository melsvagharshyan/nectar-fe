import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import {
  useForm,
  useWatch,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";
import { applyTheme, readTheme } from "./helpers";
import type { Theme } from "./types";

const themeListeners = new Set<() => void>();

function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme);
  const setTheme = (next: Theme) => {
    applyTheme(next);
    themeListeners.forEach((listener) => listener());
  };
  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
  };
}

const FOCUSABLE =
  'button:not(:disabled),input:not(:disabled),select,textarea,a[href],[tabindex="0"]';

export function useFilterForm<T extends FieldValues>(defaultValues: T) {
  const form = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const watched = useWatch({ control: form.control });
  const values: T = { ...defaultValues, ...watched };
  return { ...form, values };
}

export function useDirtyClose(dirty: boolean, onClose: () => void) {
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const dirtyRef = useRef(dirty);
  const allowed = useRef(false);
  const pending = useRef<string | null>(null);

  useEffect(() => {
    dirtyRef.current = dirty;
  });

  useEffect(() => {
    const beforeNavigate = (e: Event) => {
      if (dirtyRef.current && !allowed.current) {
        e.preventDefault();
        pending.current = (e as CustomEvent<{ target: string }>).detail.target;
        setConfirmOpen(true);
      }
    };
    window.addEventListener("nectar:navigate", beforeNavigate);
    return () => window.removeEventListener("nectar:navigate", beforeNavigate);
  }, []);

  return {
    isConfirmOpen,
    finish: () => {
      allowed.current = true;
    },
    close: () => (dirty ? setConfirmOpen(true) : onClose()),
    stay: () => {
      pending.current = null;
      setConfirmOpen(false);
    },
    leave: () => {
      allowed.current = true;
      if (pending.current) location.hash = pending.current;
      else onClose();
    },
  };
}

export function useDialogFocus(
  ref: RefObject<HTMLDivElement | null>,
  onClose: () => void,
) {
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const el = ref.current;
    if (!el) return;
    el.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const target = e.target as HTMLElement;
        if (target.getAttribute("aria-expanded") === "true") return;
        e.stopPropagation();
        close.current();
      }
      if (e.key !== "Tab") return;
      const items = Array.from(
        el.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((x) => x.offsetParent !== null);
      const first = items[0];
      const last = items.at(-1);
      if (!first) {
        e.preventDefault();
        return;
      }
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === el)) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && (active === last || active === el)) {
        e.preventDefault();
        first.focus();
      }
    };
    el.addEventListener("keydown", onKeyDown);
    return () => {
      el.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [ref]);
}
