import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "../../../api/auth-api-ts/authApi";
import { getApiErrorMessage } from "../../../api/errors";
import { notify } from "../../../components/toaster";
import { SIGN_IN_DEFAULTS } from "./constants";
import type { SignInFormValues } from "./types";
import { signInSchema } from "./validations";

export function useSignInForm() {
  const [signIn] = useSignInMutation();
  const form = useForm<SignInFormValues>({
    defaultValues: SIGN_IN_DEFAULTS,
    resolver: zodResolver(signInSchema),
  });

  const submit = form.handleSubmit(async (values) => {
    const result = await signIn(values);
    if (result.error) {
      notify.error("Не удалось войти", { description: getApiErrorMessage(result.error) });
      return;
    }
    notify.success(`С возвращением, ${result.data.user.name.split(" ")[0]}!`, {
      description: "Рады видеть вас снова в Nectar",
    });
  });

  return { form, submit };
}
