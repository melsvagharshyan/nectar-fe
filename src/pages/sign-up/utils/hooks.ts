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
  const [submittedEmail, setSubmittedEmail] = useState("");
  const form = useForm<SignUpFormValues>({
    defaultValues: SIGN_UP_DEFAULTS,
    resolver: zodResolver(signUpSchema),
  });
  const role = useWatch({ control: form.control, name: "role" });

  const submit = form.handleSubmit(async (values) => {
    const result = await signUp(toSignUpRequest(values));
    // A taken email is accepted like any other, so the form can't be used to find accounts.
    if (result.error) {
      notify.error("Не удалось отправить заявку", {
        description: getApiErrorMessage(result.error),
      });
      return;
    }
    setSubmittedEmail(result.data.email);
    setStep("submitted");
    // Don't keep the password in memory once the application is filed.
    form.reset(SIGN_UP_DEFAULTS);
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
    submittedEmail,
    goToDetails,
    goToRole,
    submit,
  };
}
