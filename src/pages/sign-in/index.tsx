import { navigate } from "../../app/router";
import { AUTH_ROUTES } from "../../app/utils/constants";
import { AuthLayout } from "../../components/auth-layout";
import { Button } from "../../components/ui";
import { SignInForm } from "./components/SignInForm";

export function SignIn() {
  return (
    <AuthLayout
      title="С возвращением"
      subtitle="Введите email и пароль, чтобы войти в кабинет"
      footer={
        <>
          Нет аккаунта?{" "}
          <Button variant="link" onClick={() => navigate(AUTH_ROUTES.signUp)}>
            Зарегистрироваться
          </Button>
        </>
      }
    >
      <SignInForm />
    </AuthLayout>
  );
}
