import { Suspense } from "react";
import { useForm, useWatch } from "react-hook-form";
import { DistrictMap } from "../../../components/district-map";
import { Button, Overlay, OverlayFooter } from "../../../components/ui";
import { toggleValue } from "../../../utils/helpers";
import { useDistrictStats } from "../utils/hooks";
import { DistrictPickerList } from "./DistrictPickerList";

interface DistrictMapValues {
  selection: string[];
}

export function DistrictMapDialog({
  selected,
  onApply,
  onClose,
}: {
  selected: string[];
  onApply: (districts: string[]) => void;
  onClose: () => void;
}) {
  const stats = useDistrictStats();
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
    <Overlay title="Районы на карте" modal wide onClose={onClose}>
      <p className="mt-0 mb-14 text-[13px] text-muted">
        Нажмите на район, чтобы добавить его в запрос. Наведите курсор — покажем, сколько
        объектов уже есть в базе.
      </p>
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_220px]">
        <Suspense
          fallback={
            <div className="grid h-460 place-items-center rounded-[14px] border border-line bg-fill text-[13px] text-muted max-md:h-340">
              Загружаем карту…
            </div>
          }
        >
          <DistrictMap selected={selection} onToggle={toggle} stats={stats} />
        </Suspense>
        <DistrictPickerList selected={selection} stats={stats} onToggle={toggle} />
      </div>
      <OverlayFooter>
        <Button onClick={() => setValue("selection", [])} disabled={!selection.length}>
          Очистить
        </Button>
        <span className="flex-1" />
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="primary" onClick={apply}>
          Применить{selection.length ? ` (${selection.length})` : ""}
        </Button>
      </OverlayFooter>
    </Overlay>
  );
}
