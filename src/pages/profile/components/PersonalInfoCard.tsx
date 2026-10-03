import { FiLock, FiUser } from "react-icons/fi";
import type { UserDto } from "../../../api/auth-api-ts/types";
import { ControlledField, FormField, Input } from "../../../components/form";
import { Button } from "../../../components/ui";
import { BOX, FORM } from "../../../utils/styles";
import { cn } from "../../../utils/helpers";
import { usePersonalInfoForm } from "../utils/hooks";
import { ProfileCardHeader } from "./ProfileCardHeader";

export function PersonalInfoCard({ user }: { user: UserDto }) {
  const { form, submit, cancel } = usePersonalInfoForm(user);
  const { isDirty, isSubmitting } = form.formState;

  return (
    <section className={BOX} aria-labelledby="personal-info-title">
      <ProfileCardHeader
        icon={<FiUser />}
        title="Личные данные"
        description="Имя и телефон видят коллеги и партнёры в запросах и предложениях"
      />
      <form className={FORM} onSubmit={submit} noValidate>
        <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1">
          <ControlledField
            control={form.control}
            name="name"
            label="Имя и фамилия"
            placeholder="Анна Петросян"
            autoComplete="name"
          />
          <ControlledField
            control={form.control}
            name="phone"
            label="Телефон"
            type="tel"
            placeholder="+374 00 000 000"
            autoComplete="tel"
          />
        </div>
        <div>
          <FormField id="profile-email" label="Email">
            <Input
              id="profile-email"
              value={user.email}
              disabled
              prefix={<FiLock className="text-faint" aria-hidden />}
              aria-describedby="profile-email-hint"
            />
          </FormField>
          <p id="profile-email-hint" className="mt-6 text-[11px] text-faint">
            Email используется для входа и не меняется
          </p>
        </div>
        <div className={cn("flex justify-end gap-8 border-t border-line pt-16")}>
          <Button variant="ghost" disabled={!isDirty || isSubmitting} onClick={cancel}>
            Отменить
          </Button>
          <Button type="submit" variant="primary" disabled={!isDirty || isSubmitting}>
            {isSubmitting ? "Сохраняем…" : "Сохранить изменения"}
          </Button>
        </div>
      </form>
    </section>
  );
}
