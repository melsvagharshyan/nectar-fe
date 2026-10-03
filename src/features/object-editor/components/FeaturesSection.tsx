import { Controller, useFormContext } from "react-hook-form";
import { ChipGroup, ControlledField } from "../../../components/form";
import {
  EDITOR_AMENITIES,
  EDITOR_BALCONY_OPTIONS,
  EDITOR_BATHROOM_OPTIONS,
  EDITOR_BUILDING_OPTIONS,
  EDITOR_FURNITURE_OPTIONS,
  EDITOR_PARKING_OPTIONS,
  EDITOR_REPAIR_OPTIONS,
  NOT_SPECIFIED,
} from "../utils/constants";
import type { PropertyFormValues } from "../utils/types";
import { SECTION, SECTION_SUMMARY } from "../utils/styles";
import { FORM_GRID } from "../../../utils/styles";

export function FeaturesSection({ type }: { type: string }) {
  const { control } = useFormContext<PropertyFormValues>();
  const isLand = type === "Участок";
  const field = (
    name: Exclude<keyof PropertyFormValues, "media" | "amenities">,
    label: string,
    options: string[],
  ) => (
    <ControlledField
      control={control}
      name={name}
      label={label}
      options={options}
      placeholder={NOT_SPECIFIED}
    />
  );
  return (
    <details className={SECTION} open>
      <summary className={SECTION_SUMMARY}>Оснащение и характеристики</summary>
      <div className={FORM_GRID}>
        {field("repair", "Ремонт", EDITOR_REPAIR_OPTIONS)}
        {!isLand && field("furniture", "Мебель", EDITOR_FURNITURE_OPTIONS)}
        {field("parking", "Парковка", EDITOR_PARKING_OPTIONS)}
        {!isLand && field("bathroom", "Санузел", EDITOR_BATHROOM_OPTIONS)}
        {!isLand && field("balcony", "Балкон / Лоджия", EDITOR_BALCONY_OPTIONS)}
        {field("building", "Тип дома", EDITOR_BUILDING_OPTIONS)}
      </div>
      <Controller
        control={control}
        name="amenities"
        render={({ field }) => (
          <ChipGroup
            label="Удобства и особенности"
            className="mt-20 border-t border-line pt-20"
            options={EDITOR_AMENITIES}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </details>
  );
}
