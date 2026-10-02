import { ControlledField } from "../../../components/form";
import { Button } from "../../../components/ui";
import { ERROR_BOX, FORM, FORM_GRID } from "../../../utils/styles";
import { ROLE_OPTIONS, SIGN_UP_FORM_ID } from "../utils/constants";
import { useSignUpForm } from "../utils/hooks";
import { RolePicker } from "./RolePicker";

export function SignUpForm() {
  const { form, role, submit, error } = useSignUpForm();
  const { control, formState } = form;
  const { companyLabel } = ROLE_OPTIONS[role];

  return (
    <form id={SIGN_UP_FORM_ID} className={FORM} onSubmit={submit} noValidate>
      <RolePicker control={control} />
      <ControlledField control={control} name="name" label="Имя и фамилия" autoComplete="name" />
      <div className={FORM_GRID}>
        <ControlledField control={control} name="email" label="Email" type="email" autoComplete="email" />
        <ControlledField control={control} name="phone" label="Телефон (необязательно)" type="tel" autoComplete="tel" />
      </div>
      {companyLabel ? (
        <ControlledField
          control={control}
          name="companyName"
          label={`Название компании · ${companyLabel}`}
          autoComplete="organization"
        />
      ) : (
        <ControlledField
          control={control}
          name="adminCode"
          label="Код администратора"
          type="password"
          autoComplete="off"
        />
      )}
      <div className={FORM_GRID}>
        <ControlledField control={control} name="password" label="Пароль" type="password" autoComplete="new-password" />
        <ControlledField
          control={control}
          name="confirmPassword"
          label="Повторите пароль"
          type="password"
          autoComplete="new-password"
        />
      </div>
      {error && <p className={ERROR_BOX}>{error}</p>}
      <Button type="submit" variant="primary" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? "Создаём аккаунт…" : "Зарегистрироваться"}
      </Button>
    </form>
  );
}
