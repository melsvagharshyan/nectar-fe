import { navigate } from "../../../app/router";
import { AUTH_ROUTES } from "../../../app/utils/constants";
import { AuthNotice } from "../../../components/auth-layout";
import { Button } from "../../../components/ui";
import type { SignInNotice as Notice } from "../utils/types";

/** Explains why a correct email and password still don't open the cabinet. */
export function SignInNotice({ notice }: { notice: Notice }) {
  switch (notice.kind) {
    case "pending":
      return (
        <AuthNotice tone="info" title="Заявка на рассмотрении">
          Мы откроем доступ после проверки администратором.
        </AuthNotice>
      );
    case "rejected":
      return (
        <AuthNotice tone="danger" title="Заявка отклонена">
          {notice.reason && <p>Комментарий администратора: {notice.reason}</p>}
          <Button
            variant="link"
            className="mt-4 text-[13px] font-semibold"
            onClick={() => navigate(AUTH_ROUTES.signUp)}
          >
            Подать новую заявку
          </Button>
        </AuthNotice>
      );
    case "blocked":
      return (
        <AuthNotice tone="danger" title="Аккаунт заблокирован администратором">
          {notice.reason && <p>Причина: {notice.reason}</p>}
          <p>Чтобы восстановить доступ, свяжитесь с администрацией Nectar.</p>
        </AuthNotice>
      );
  }
}
