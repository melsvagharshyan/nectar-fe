import { navigate } from "../../../app/router";
import { AUTH_ROUTES } from "../../../app/utils/constants";
import { AUTH_SUBMIT_BUTTON, AuthNotice } from "../../../components/auth-layout";
import { Button, Icon } from "../../../components/ui";

/** Shown after sign-up: the account only exists once an admin approves it. */
export function SubmittedStep({ email }: { email: string }) {
  return (
    <div className="flex flex-col gap-20">
      <AuthNotice tone="success" title="Мы получили вашу заявку">
        Администратор Nectar проверит данные, после чего вы сможете войти
        с указанным email (<strong className="font-semibold">{email}</strong>) и паролем.
      </AuthNotice>
      <Button
        variant="primary"
        className={AUTH_SUBMIT_BUTTON}
        onClick={() => navigate(AUTH_ROUTES.signIn)}
      >
        Перейти ко входу
        <Icon name="arrow" className="size-16" />
      </Button>
    </div>
  );
}
