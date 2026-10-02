import { cn } from "../../utils/helpers";
import { useTheme } from "../../utils/hooks";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <Button
      iconOnly
      className={cn("theme-toggle", className)}
      aria-label={dark ? "Светлая тема" : "Тёмная тема"}
      aria-pressed={dark}
      onClick={toggleTheme}
    >
      <Icon name={dark ? "sun" : "moon"} />
    </Button>
  );
}
