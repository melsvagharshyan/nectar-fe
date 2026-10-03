import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from "../../../api/auth-api-ts/authApi";
import type { UserDto } from "../../../api/auth-api-ts/types";
import { getApiErrorMessage } from "../../../api/errors";
import { notify } from "../../../components/toaster";
import { PASSWORD_DEFAULTS } from "./constants";
import { getAvatarFileError } from "./helpers";
import type { PasswordFormValues, PersonalInfoFormValues } from "./types";
import { passwordSchema, personalInfoSchema } from "./validations";

export function useAvatar(user: UserDto) {
  const [uploadAvatar] = useUploadAvatarMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [busy, setBusy] = useState<"upload" | "remove" | null>(null);

  const saveAvatar = (avatarUrl: string | null) => updateProfile({ avatarUrl });

  const upload = async (file: File) => {
    const reason = getAvatarFileError(file);
    if (reason) {
      notify.error("Фото не подходит", { description: reason });
      return;
    }
    setBusy("upload");
    const uploaded = await uploadAvatar(file);
    const saved = uploaded.error ? uploaded : await saveAvatar(uploaded.data.url);
    setBusy(null);
    if (saved.error) {
      notify.error("Не удалось обновить фото", { description: getApiErrorMessage(saved.error) });
      return;
    }
    notify.success("Фото профиля обновлено", { description: "Его увидят коллеги и партнёры" });
  };

  const remove = async () => {
    const previous = user.avatarUrl;
    setBusy("remove");
    const result = await saveAvatar(null);
    setBusy(null);
    if (result.error) {
      notify.error("Не удалось удалить фото", { description: getApiErrorMessage(result.error) });
      return;
    }
    notify.success("Фото удалено", {
      description: "Вместо него показываем ваши инициалы",
      action: previous
        ? { label: "Отменить", onClick: () => void saveAvatar(previous) }
        : undefined,
    });
  };

  return { upload, remove, uploading: busy === "upload", removing: busy === "remove" };
}

const toPersonalInfo = (user: UserDto): PersonalInfoFormValues => ({
  name: user.name,
  phone: user.phone,
});

export function usePersonalInfoForm(user: UserDto) {
  const [updateProfile] = useUpdateProfileMutation();
  const form = useForm<PersonalInfoFormValues>({
    defaultValues: toPersonalInfo(user),
    resolver: zodResolver(personalInfoSchema),
  });
  const { reset, formState } = form;

  // Keep the form in sync when the profile changes elsewhere (e.g. another tab refreshed `me`).
  useEffect(() => {
    if (!formState.isDirty) reset(toPersonalInfo(user));
  }, [user, reset, formState.isDirty]);

  const submit = form.handleSubmit(async (values) => {
    const result = await updateProfile(values);
    if (result.error) {
      notify.error("Не удалось сохранить изменения", {
        description: getApiErrorMessage(result.error),
      });
      return;
    }
    reset(toPersonalInfo(result.data));
    notify.success("Профиль сохранён", { description: "Личные данные обновлены" });
  });

  const cancel = () => reset(toPersonalInfo(user));

  return { form, submit, cancel };
}

export function usePasswordForm() {
  const [changePassword] = useChangePasswordMutation();
  const form = useForm<PasswordFormValues>({
    defaultValues: PASSWORD_DEFAULTS,
    resolver: zodResolver(passwordSchema),
  });

  const submit = form.handleSubmit(async ({ currentPassword, newPassword }) => {
    const result = await changePassword({ currentPassword, newPassword });
    if (result.error) {
      const message = getApiErrorMessage(result.error);
      if ("status" in result.error && result.error.status === 400)
        form.setError("currentPassword", { message }, { shouldFocus: true });
      else notify.error("Не удалось сменить пароль", { description: message });
      return;
    }
    form.reset(PASSWORD_DEFAULTS);
    notify.success("Пароль изменён", {
      description: "В следующий раз входите с новым паролем",
    });
  });

  return { form, submit };
}
