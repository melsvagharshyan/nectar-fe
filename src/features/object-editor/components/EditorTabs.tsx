import { Button } from "../../../components/ui";
import type { EditorTab } from "../utils/types";
import { EDITOR_TABS, EMBEDDED_TABS } from "../utils/styles";
import { CHIPS } from "../../../utils/styles";
import { cn } from "../../../utils/helpers";

export function EditorTabs({
  value,
  embedded,
  onChange,
}: {
  value: EditorTab;
  embedded: boolean;
  onChange: (tab: EditorTab) => void;
}) {
  return (
    <div className={cn(CHIPS, EDITOR_TABS, embedded && EMBEDDED_TABS)}>
      <Button selected={value === "form"} onClick={() => onChange("form")}>
        Форма
      </Button>
      <Button selected={value === "preview"} onClick={() => onChange("preview")}>
        Предпросмотр
      </Button>
    </div>
  );
}
