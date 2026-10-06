import { navigate } from "../../app/router";
import { AUTH_ROUTES } from "../../app/utils/constants";
import { AuthLayout } from "../../components/auth-layout";
import { Button } from "../../components/ui";
import { SignInForm } from "../sign-in/components/SignInForm";
import { AdminBadge } from "./components/AdminBadge";
import { AdminHero } from "./components/AdminHero";

/** Sign-in for Nectar administrators; brokers and partners use /sign-in. */
export function AdminSignIn() {
  return (
    <AuthLayout
      title="Вход в панель управления"
      subtitle="Доступ только для администраторов Nectar"
      hero={<AdminHero />}
      badge={<AdminBadge />}
      footer={
        <>
          Не администратор?{" "}
          <Button variant="link" onClick={() => navigate(AUTH_ROUTES.signIn)}>
            Вход для брокеров
          </Button>
        </>
      }
    >
      <SignInForm admin />
    </AuthLayout>
  );
}
