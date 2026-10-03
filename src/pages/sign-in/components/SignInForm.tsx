import { ControlledField } from "../../../components/form";
import { AUTH_SUBMIT_BUTTON } from "../../../components/auth-layout";
import { Button } from "../../../components/ui";
import { FORM } from "../../../utils/styles";
import { SIGN_IN_FORM_ID } from "../utils/constants";
import { useSignInForm } from "../utils/hooks";

export function SignInForm() {
  const { form, submit } = useSignInForm();
  const { isSubmitting } = form.formState;

  return (
    <form id={SIGN_IN_FORM_ID} className={FORM} onSubmit={submit} noValidate>
      <ControlledField
        control={form.control}
        name="email"
        label="Email"
        type="email"
        placeholder="name@example.com"
        autoComplete="email"
      />
      <ControlledField
        control={form.control}
        name="password"
        label="Пароль"
        type="password"
        placeholder="Ваш пароль"
        autoComplete="current-password"
      />
      <Button type="submit" variant="primary" className={AUTH_SUBMIT_BUTTON} disabled={isSubmitting}>
        {isSubmitting ? "Вход…" : "Войти"}
      </Button>
    </form>
  );
}
