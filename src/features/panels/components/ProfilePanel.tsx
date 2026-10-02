import { closePanel, navigate } from "../../../app/router";
import { useCurrentUser, useSignOut } from "../../../app/utils/hooks";
import { Button, Overlay } from "../../../components/ui";
import type { Role } from "../../../demo/types";
import { ROLE_NAMES } from "../../../utils/constants";
import { STACK } from "../../../utils/styles";
import { cn } from "../../../utils/helpers";

export function ProfilePanel({ role }: { role: Role }) {
  const user = useCurrentUser();
  const signOut = useSignOut();

  return (
    <Overlay title="Профиль" modal onClose={closePanel}>
      {user && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-16 gap-y-8 text-[13px] [&_dt]:text-muted">
          <dt>Имя</dt>
          <dd>{user.name}</dd>
          <dt>Email</dt>
          <dd>{user.email}</dd>
          <dt>Роль</dt>
          <dd>{ROLE_NAMES[user.role]}</dd>
          {user.companyName && (
            <>
              <dt>Компания</dt>
              <dd>{user.companyName}</dd>
            </>
          )}
        </dl>
      )}
      <div className={cn(STACK, "mt-20")}>
        <Button onClick={() => navigate("/" + role + "/settings")}>
          {role === "admin" ? "Настройки" : "Настройки компании"}
        </Button>
        <Button onClick={signOut}>Выйти</Button>
      </div>
    </Overlay>
  );
}
