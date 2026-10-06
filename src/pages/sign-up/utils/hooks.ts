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
    if (result.error) {
      const message = getApiErrorMessage(result.error);
      // 409: the email already has an account or a pending application.
      if ("status" in result.error && result.error.status === 409) {
        form.setError("email", { message }, { shouldFocus: true });
        return;
      }
      notify.error("Не удалось отправить заявку", { description: message });
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
