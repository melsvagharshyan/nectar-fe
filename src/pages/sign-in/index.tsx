import { navigate } from "../../app/router";
import { AUTH_ROUTES } from "../../app/utils/constants";
import { AuthLayout } from "../../components/AuthLayout";
import { Button } from "../../components/ui";
import { SignInForm } from "./components/SignInForm";

export function SignIn() {
  return (
    <AuthLayout
      title="Вход в кабинет"
      subtitle="Российский брокер, армянский брокер или администратор."
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
