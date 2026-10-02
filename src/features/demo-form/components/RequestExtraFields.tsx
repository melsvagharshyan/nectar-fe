import { Controller, useFormContext, useWatch } from "react-hook-form";
import { ChipGroup, ControlledField } from "../../../components/form";
import {
  FURNITURE_OPTIONS,
  MARKET_OPTIONS,
  PARKING_OPTIONS,
  REPAIR_OPTIONS,
  REQUEST_AMENITIES,
  VIEW_OPTIONS,
} from "../utils/constants";
import type { DemoFormValues } from "../utils/types";
import { DISCLOSURE_SUMMARY, FORM_GRID } from "../../../utils/styles";

export function RequestExtraFields() {
  const { control } = useFormContext<DemoFormValues>();
  const type = useWatch({ control, name: "type" });
  return (
    <details>
      <summary className={DISCLOSURE_SUMMARY}>Дополнительные параметры</summary>
      <div className={FORM_GRID}>
        <ControlledField control={control} name="market" label="Рынок" options={MARKET_OPTIONS} />
        <ControlledField control={control} name="repair" label="Ремонт" options={REPAIR_OPTIONS} />
        {type !== "Участок" && (
          <ControlledField
            control={control}
            name="furniture"
            label="Мебель"
            options={FURNITURE_OPTIONS}
          />
        )}
        <ControlledField control={control} name="parking" label="Парковка" options={PARKING_OPTIONS} />
        <ControlledField control={control} name="view" label="Вид" options={VIEW_OPTIONS} />
      </div>
      <Controller
        control={control}
        name="amenities"
        render={({ field }) => (
          <ChipGroup
            label="Удобства"
            options={REQUEST_AMENITIES}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </details>
  );
}
