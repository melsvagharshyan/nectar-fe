import { ControlledField } from "../../../components/form";
import { Button } from "../../../components/ui";
import { ERROR_BOX, FORM } from "../../../utils/styles";
import { SIGN_IN_FORM_ID } from "../utils/constants";
import { useSignInForm } from "../utils/hooks";
export function SignInForm() {
  const { form, submit, error } = useSignInForm();
  const { isSubmitting } = form.formState;

  return (
    <form id={SIGN_IN_FORM_ID} className={FORM} onSubmit={submit} noValidate>
        <ControlledField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
        />
        <ControlledField
          control={form.control}
          name="password"
          label="Пароль"
          type="password"
          autoComplete="current-password"
        />
        {error && <p className={ERROR_BOX}>{error}</p>}
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Вход…" : "Войти"}
        </Button>
    </form>
  );
}
