import { useFormContext } from "react-hook-form";
import { ControlledField } from "../../../components/form";
import { DISTRICTS } from "../../../utils/constants";
import type { PropertyFormValues } from "../utils/types";
import { SECTION, SECTION_TITLE } from "../utils/styles";

export function LocationSection() {
  const { control } = useFormContext<PropertyFormValues>();
  return (
    <section className={SECTION}>
      <h2 className={SECTION_TITLE}>РАСПОЛОЖЕНИЕ И АДРЕС</h2>
      <ControlledField control={control} name="district" label="Район" options={["", ...DISTRICTS]} />
      <ControlledField control={control} name="location" label="Ориентир" />
      <ControlledField control={control} name="internalAddress" label="Улица и номер дома" />
    </section>
  );
}
