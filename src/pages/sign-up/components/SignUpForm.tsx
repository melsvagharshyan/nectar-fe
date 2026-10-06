import { useFormContext } from "react-hook-form";
import { ControlledField } from "../../../components/form";
import { AUTH_SUBMIT_BUTTON } from "../../../components/auth-layout";
import { Button } from "../../../components/ui";
import type { SignUpRole } from "../../../api/auth-api-ts/types";
import { FORM, FORM_GRID } from "../../../utils/styles";
import { MIN_PASSWORD_LENGTH, ROLE_OPTIONS, SIGN_UP_FORM_ID } from "../utils/constants";
import type { SignUpFormValues } from "../utils/types";
import { SelectedRole } from "./SelectedRole";

export function SignUpForm({
  role,
  onSubmit,
  onChangeRole,
}: {
  role: SignUpRole;
  onSubmit: () => void;
  onChangeRole: () => void;
}) {
  const { control, formState } = useFormContext<SignUpFormValues>();
  const { company, phonePlaceholder } = ROLE_OPTIONS[role];

  return (
    <form id={SIGN_UP_FORM_ID} className={FORM} onSubmit={onSubmit} noValidate>
      <SelectedRole role={role} onChange={onChangeRole} />
      <ControlledField control={control} name="name" label="Имя и фамилия" placeholder="Анна Петрова" autoComplete="name" />
      <div className={FORM_GRID}>
        <ControlledField control={control} name="email" label="Email" type="email" placeholder="name@example.com" autoComplete="email" />
        <ControlledField control={control} name="phone" label="Телефон · необязательно" type="tel" placeholder={phonePlaceholder} autoComplete="tel" />
      </div>
      <ControlledField
        control={control}
        name="companyName"
        label={company.label}
        placeholder={company.placeholder}
        autoComplete="organization"
      />
      <div className={FORM_GRID}>
        <ControlledField
          control={control}
          name="password"
          label="Пароль"
          type="password"
          placeholder={`Минимум ${MIN_PASSWORD_LENGTH} символов`}
          autoComplete="new-password"
        />
        <ControlledField
          control={control}
          name="confirmPassword"
          label="Повторите пароль"
          type="password"
          placeholder="Ещё раз"
          autoComplete="new-password"
        />
      </div>
      <p className="text-center text-[12px] text-muted">
        Доступ откроется после проверки заявки администратором
      </p>
      <Button
        type="submit"
        variant="primary"
        className={AUTH_SUBMIT_BUTTON}
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? "Отправляем…" : "Отправить заявку"}
      </Button>
    </form>
  );
}
