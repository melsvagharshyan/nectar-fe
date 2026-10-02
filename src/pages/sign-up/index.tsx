import { navigate } from "../../app/router";
import { AUTH_ROUTES } from "../../app/utils/constants";
import { AuthLayout } from "../../components/AuthLayout";
import { Button } from "../../components/ui";
import { SignUpForm } from "./components/SignUpForm";

export function SignUp() {
  return (
    <AuthLayout
      title="Регистрация"
      subtitle="Выберите роль. Для брокеров будет создана компания."
      footer={
        <>
          Уже есть аккаунт?{" "}
          <Button variant="link" onClick={() => navigate(AUTH_ROUTES.signIn)}>
            Войти
          </Button>
        </>
      }
    >
      <SignUpForm />
    </AuthLayout>
  );
}
