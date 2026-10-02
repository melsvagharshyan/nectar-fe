import { useFormContext } from "react-hook-form";
import { ControlledField } from "../../../components/form";
import type { Employee } from "../../../demo/types";
import type { DemoFormValues } from "../utils/types";

export function ClientFields({ staff }: { staff: Employee[] }) {
  const { control } = useFormContext<DemoFormValues>();
  return (
    <>
      <ControlledField control={control} name="name" label="ФИО *" />
      <ControlledField
        control={control}
        name="phone"
        label="Телефон *"
        type="tel"
      />
      <ControlledField control={control} name="email" label="Email" type="email" />
      <ControlledField
        control={control}
        name="employeeId"
        label="Ответственный менеджер *"
        options={staff.map((e) => ({ value: e.id, label: e.name }))}
      />
    </>
  );
}
