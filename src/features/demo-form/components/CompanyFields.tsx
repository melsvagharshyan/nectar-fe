import { useFormContext } from "react-hook-form";
import { ControlledField } from "../../../components/form";
import { COMPANY_KIND_OPTIONS } from "../utils/constants";
import type { DemoFormValues } from "../utils/types";

export function CompanyFields({ isNew }: { isNew: boolean }) {
  const { control } = useFormContext<DemoFormValues>();
  return (
    <>
      <ControlledField control={control} name="name" label="Название компании *" />
      {isNew && (
        <ControlledField
          control={control}
          name="companyKind"
          label="Тип компании"
          options={COMPANY_KIND_OPTIONS}
        />
      )}
      <ControlledField control={control} name="website" label="Сайт или контакт" />
    </>
  );
}
