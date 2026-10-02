import { useFormContext } from "react-hook-form";
import { ControlledField } from "../../../components/form";
import type { PropertyFormValues } from "../utils/types";
import { SECTION, SECTION_TITLE } from "../utils/styles";

export function DescriptionSection() {
  const { control } = useFormContext<PropertyFormValues>();
  return (
    <section className={SECTION}>
      <h2 className={SECTION_TITLE}>Описание и заметки</h2>
      <ControlledField
        control={control}
        name="description"
        label="Полное описание для клиентов"
        type="textarea"
      />
      <ControlledField
        control={control}
        name="privateNotes"
        label="Внутреннее описание / Заметки"
        type="textarea"
      />
    </section>
  );
}
