import { Controller, useFormContext, useWatch } from "react-hook-form";
import { ChipGroup, ControlledField } from "../../../components/form";
import type { Client } from "../../../demo/types";
import { PROPERTY_TYPES, TYPES_WITHOUT_ROOMS } from "../../../utils/constants";
import {
  REQUEST_GOALS,
  REQUEST_ROOM_OPTIONS,
  REQUEST_TERMS,
} from "../utils/constants";
import type { DemoFormValues } from "../utils/types";
import { RequestDistrictsField } from "./RequestDistrictsField";
import { RequestExtraFields } from "./RequestExtraFields";
import { BOX, FORM_GRID } from "../../../utils/styles";

export function RequestFields({
  client,
  onOpenMap,
}: {
  client?: Client;
  onOpenMap: () => void;
}) {
  const { control } = useFormContext<DemoFormValues>();
  const type = useWatch({ control, name: "type" });
  return (
    <>
      <div className={BOX}>
        Запрос для {client?.name} · {client?.publicId}
      </div>
      <ControlledField
        control={control}
        name="type"
        label="Тип недвижимости *"
        options={PROPERTY_TYPES}
      />
      <RequestDistrictsField onOpenMap={onOpenMap} />
      <div className={FORM_GRID}>
        <ControlledField control={control} name="budgetMin" label="Бюджет от, USD" type="number" />
        <ControlledField control={control} name="budgetMax" label="Бюджет до, USD *" type="number" />
        <ControlledField control={control} name="areaMin" label="Площадь от, м²" type="number" />
        <ControlledField control={control} name="areaMax" label="Площадь до, м²" type="number" />
      </div>
      {!TYPES_WITHOUT_ROOMS.includes(type) && (
        <Controller
          control={control}
          name="rooms"
          render={({ field }) => (
            <ChipGroup
              label="Комнаты"
              options={REQUEST_ROOM_OPTIONS}
              value={field.value ? [field.value] : []}
              onChange={(v) => field.onChange(v.at(-1) ?? "")}
            />
          )}
        />
      )}
      <div className={FORM_GRID}>
        <ControlledField control={control} name="goal" label="Цель" options={REQUEST_GOALS} />
        <ControlledField control={control} name="term" label="Срок" options={REQUEST_TERMS} />
      </div>
      <RequestExtraFields />
      <ControlledField
        control={control}
        name="notes"
        label="Пожелания клиента"
        type="textarea"
      />
    </>
  );
}
