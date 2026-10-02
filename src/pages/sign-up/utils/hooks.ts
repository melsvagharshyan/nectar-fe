import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useSignUpMutation } from "../../../api/auth-api-ts/authApi";
import { getApiErrorMessage } from "../../../api/errors";
import { SIGN_UP_DEFAULTS } from "./constants";
import { toSignUpRequest } from "./helpers";
import type { SignUpFormValues } from "./types";
import { signUpSchema } from "./validations";

export function useSignUpForm() {
  const [signUp, { error }] = useSignUpMutation();
  const form = useForm<SignUpFormValues>({
    defaultValues: SIGN_UP_DEFAULTS,
    resolver: zodResolver(signUpSchema),
  });
  const role = useWatch({ control: form.control, name: "role" });

  const submit = form.handleSubmit(async (values) => {
    await signUp(toSignUpRequest(values));
  });

  return {
    form,
    role,
    submit,
    error: error ? getApiErrorMessage(error) : undefined,
  };
}
