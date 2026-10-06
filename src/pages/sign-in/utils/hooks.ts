import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "../../../api/auth-api-ts/authApi";
import { signOutReasonCleared } from "../../../api/auth-api-ts/authSlice";
import {
  getApiErrorCode,
  getApiErrorMessage,
  getApiErrorReason,
} from "../../../api/errors";
import { useAppDispatch, useAppSelector } from "../../../api/store";
import { notify } from "../../../components/toaster";
import { SIGN_IN_DEFAULTS } from "./constants";
import type { SignInFormValues, SignInNotice } from "./types";
import { signInSchema } from "./validations";

export function useSignInForm() {
  const dispatch = useAppDispatch();
  const [signIn] = useSignInMutation();
  // Set when the server ended the session because an admin blocked the account.
  const signOutReason = useAppSelector((s) => s.auth.signOutReason);
  const [notice, setNotice] = useState<SignInNotice | null>(null);
  const form = useForm<SignInFormValues>({
    defaultValues: SIGN_IN_DEFAULTS,
    resolver: zodResolver(signInSchema),
  });

  const submit = form.handleSubmit(async (values) => {
    setNotice(null);
    if (signOutReason) dispatch(signOutReasonCleared());
    const result = await signIn(values);
    if (result.error) {
      const reason = getApiErrorReason(result.error);
      switch (getApiErrorCode(result.error)) {
        case "REGISTRATION_PENDING":
          return setNotice({ kind: "pending" });
        case "REGISTRATION_REJECTED":
          return setNotice({ kind: "rejected", reason });
        case "ACCOUNT_BLOCKED":
          return setNotice({ kind: "blocked", reason });
      }
      notify.error("Не удалось войти", { description: getApiErrorMessage(result.error) });
      return;
    }
    notify.success(`С возвращением, ${result.data.user.name.split(" ")[0]}!`, {
      description: "Рады видеть вас снова в Nectar",
    });
  });

  return {
    form,
    submit,
    notice: notice ?? (signOutReason === "blocked" ? { kind: "blocked" as const } : null),
  };
}
