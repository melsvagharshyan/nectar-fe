import { useFormContext } from "react-hook-form";
import { ControlledField } from "../../../components/form";
import { EMPLOYEE_STATUS_OPTIONS } from "../utils/constants";
import type { DemoFormValues } from "../utils/types";
import { NOTICE } from "../../../utils/styles";

export function EmployeeFields() {
  const { control } = useFormContext<DemoFormValues>();
  return (
    <>
      <ControlledField control={control} name="name" label="ФИО сотрудника *" />
      <ControlledField
        control={control}
        name="phone"
        label="Телефон *"
        type="tel"
      />
      <ControlledField
        control={control}
        name="active"
        label="Статус"
        options={EMPLOYEE_STATUS_OPTIONS}
      />
      <p className={NOTICE}>
        Внутренний справочник компании. Отдельный аккаунт не создаётся.
      </p>
    </>
  );
}
