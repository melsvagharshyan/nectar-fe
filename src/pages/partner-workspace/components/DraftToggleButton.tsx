import { Button } from "../../../components/ui";
import { PRIMARY } from "../utils/styles";

export function DraftToggleButton({
  selected,
  offered,
  disabled,
  onToggle,
}: {
  selected: boolean;
  offered: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      variant={selected ? undefined : "primary"}
      className={selected ? undefined : PRIMARY}
      selected={selected}
      disabled={disabled}
      onClick={onToggle}
    >
      {offered
        ? "Уже предложен"
        : selected
          ? "Убрать из подборки"
          : "Добавить в предложение"}
    </Button>
  );
}
