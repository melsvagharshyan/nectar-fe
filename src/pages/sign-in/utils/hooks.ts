import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "../../../api/auth-api-ts/authApi";
import { getApiErrorMessage } from "../../../api/errors";
import { SIGN_IN_DEFAULTS } from "./constants";
import type { SignInFormValues } from "./types";
import { signInSchema } from "./validations";

export function useSignInForm() {
  const [signIn, { error }] = useSignInMutation();
  const form = useForm<SignInFormValues>({
    defaultValues: SIGN_IN_DEFAULTS,
    resolver: zodResolver(signInSchema),
  });

  const submit = form.handleSubmit(async (values) => {
    await signIn(values);
  });

  return {
    form,
    submit,
    error: error ? getApiErrorMessage(error) : undefined,
  };
}
