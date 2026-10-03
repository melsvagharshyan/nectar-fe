import { AUTH_SUBMIT_BUTTON } from "../../../components/auth-layout";
import { Button, Icon } from "../../../components/ui";
import { RolePicker } from "./RolePicker";

export function RoleStep({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-20">
      <RolePicker />
      <Button variant="primary" className={AUTH_SUBMIT_BUTTON} onClick={onContinue}>
        Продолжить
        <Icon name="arrow" className="size-16" />
      </Button>
    </div>
  );
}
