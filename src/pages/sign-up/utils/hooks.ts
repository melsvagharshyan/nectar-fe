import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSignUpMutation } from "../../../api/auth-api-ts/authApi";
import { getApiErrorMessage } from "../../../api/errors";
import { notify } from "../../../components/toaster";
import { SIGN_UP_DEFAULTS } from "./constants";
import { toSignUpRequest } from "./helpers";
import type { SignUpFormValues, SignUpStep } from "./types";
import { signUpSchema } from "./validations";

export function useSignUpForm() {
  const [signUp] = useSignUpMutation();
  const [step, setStep] = useState<SignUpStep>("role");
  const form = useForm<SignUpFormValues>({
    defaultValues: SIGN_UP_DEFAULTS,
    resolver: zodResolver(signUpSchema),
  });
  const role = useWatch({ control: form.control, name: "role" });

  const submit = form.handleSubmit(async (values) => {
    const result = await signUp(toSignUpRequest(values));
    if (result.error) {
      notify.error("Не удалось создать аккаунт", {
        description: getApiErrorMessage(result.error),
      });
      return;
    }
    notify.success("Аккаунт создан", {
      description: `Добро пожаловать в Nectar, ${result.data.user.name.split(" ")[0]}!`,
    });
  });

  const goToDetails = () => setStep("details");
  const goToRole = () => {
    form.clearErrors();
    setStep("role");
  };

  return {
    form,
    role,
    step,
    goToDetails,
    goToRole,
    submit,
  };
}
