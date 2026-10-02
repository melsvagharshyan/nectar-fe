import { useForm, useWatch } from "react-hook-form";
import { DistrictScheme } from "../../../components/district-scheme";
import { Button, Overlay, OverlayFooter } from "../../../components/ui";
import { DISTRICTS } from "../../../utils/constants";
import { toggleValue } from "../../../utils/helpers";
import { CHIPS, NOTICE } from "../../../utils/styles";

interface DistrictMapValues {
  selection: string[];
}

const LAST_ROW_INDEX = 6;

export function DistrictMapDialog({
  selected,
  onApply,
  onClose,
}: {
  selected: string[];
  onApply: (districts: string[]) => void;
  onClose: () => void;
}) {
  const { control, setValue, handleSubmit } = useForm<DistrictMapValues>({
    defaultValues: { selection: selected },
  });
  const selection = useWatch({ control, name: "selection" });
  const toggle = (district: string) =>
    setValue("selection", toggleValue(selection, district));
  const apply = handleSubmit((values) => {
    onApply(values.selection);
    onClose();
  });

  return (
    <Overlay title="Схема районов" modal onClose={onClose}>
      <p className={NOTICE}>
        Условная схема для выбора района. Не карта и не точные географические
        границы.
      </p>
      <DistrictScheme selected={selection} onToggle={toggle} />
      <div className={CHIPS}>
        {DISTRICTS.map((district, i) => (
          <Button
            key={district}
            selected={selection.includes(district)}
            style={{
              minHeight: 72,
              gridColumn: i === LAST_ROW_INDEX ? "2" : undefined,
            }}
            aria-pressed={selection.includes(district)}
            onClick={() => toggle(district)}
          >
            {district}
          </Button>
        ))}
      </div>
      <OverlayFooter>
        <Button onClick={() => setValue("selection", [])}>Очистить</Button>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="primary" onClick={apply}>
          Применить выбор
        </Button>
      </OverlayFooter>
    </Overlay>
  );
}
