import { useWatch } from "react-hook-form";
import { FiShield } from "react-icons/fi";
import { ControlledField } from "../../../components/form";
import { Button } from "../../../components/ui";
import { BOX, FORM } from "../../../utils/styles";
import { PASSWORD_MIN_LENGTH } from "../utils/constants";
import { usePasswordForm } from "../utils/hooks";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { ProfileCardHeader } from "./ProfileCardHeader";

export function PasswordCard() {
  const { form, submit } = usePasswordForm();
  const { isDirty, isSubmitting } = form.formState;
  const newPassword = useWatch({ control: form.control, name: "newPassword" });

  return (
    <section className={BOX} aria-label="Безопасность">
      <ProfileCardHeader
        icon={<FiShield />}
        title="Пароль и безопасность"
        description={`Используйте не меньше ${PASSWORD_MIN_LENGTH} символов: буквы разного регистра, цифры и знаки`}
      />
      <form className={FORM} onSubmit={submit} noValidate>
        <ControlledField
          control={form.control}
          name="currentPassword"
          label="Текущий пароль"
          type="password"
          autoComplete="current-password"
        />
        <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1">
          <ControlledField
            control={form.control}
            name="newPassword"
            label="Новый пароль"
            type="password"
            autoComplete="new-password"
          />
          <ControlledField
            control={form.control}
            name="confirmPassword"
            label="Повторите новый пароль"
            type="password"
            autoComplete="new-password"
          />
        </div>
        <PasswordStrengthMeter password={newPassword} />
        <div className="flex justify-end border-t border-line pt-16">
          <Button type="submit" variant="primary" disabled={!isDirty || isSubmitting}>
            {isSubmitting ? "Сохраняем…" : "Обновить пароль"}
          </Button>
        </div>
      </form>
    </section>
  );
}
