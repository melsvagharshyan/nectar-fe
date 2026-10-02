import { useFormContext } from "react-hook-form";
import { ControlledField } from "../../../components/form";
import { APARTMENT_TYPES, TYPES_WITHOUT_ROOMS } from "../../../utils/constants";
import { EDITOR_ROOM_OPTIONS } from "../utils/constants";
import type { PropertyFormValues } from "../utils/types";
import { SECTION, SECTION_TITLE } from "../utils/styles";
import { FORM_GRID } from "../../../utils/styles";
import { SegmentedField } from "./SegmentedField";

export function LayoutSection({
  type,
  readonly,
}: {
  type: string;
  readonly: boolean;
}) {
  const { control } = useFormContext<PropertyFormValues>();
  return (
    <section className={SECTION}>
      <h2 className={SECTION_TITLE}>Планировка и этажность</h2>
      {!TYPES_WITHOUT_ROOMS.includes(type) && (
        <SegmentedField
          name="rooms"
          label="Количество комнат"
          options={EDITOR_ROOM_OPTIONS}
          disabled={readonly}
        />
      )}
      {APARTMENT_TYPES.includes(type) && (
        <div className={FORM_GRID}>
          <ControlledField control={control} name="floor" label="Этаж" type="number" />
          <ControlledField control={control} name="floors" label="Этажность" type="number" />
          <ControlledField
            control={control}
            name="ceiling"
            label="Высота потолков (м)"
            type="number"
          />
        </div>
      )}
    </section>
  );
}
