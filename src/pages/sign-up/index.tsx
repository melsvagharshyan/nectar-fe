import { FormProvider } from "react-hook-form";
import { navigate } from "../../app/router";
import { AUTH_ROUTES } from "../../app/utils/constants";
import { AuthLayout } from "../../components/auth-layout";
import { Button } from "../../components/ui";
import { RoleStep } from "./components/RoleStep";
import { SignUpForm } from "./components/SignUpForm";
import { StepIndicator } from "./components/StepIndicator";
import { SubmittedStep } from "./components/SubmittedStep";
import { SIGN_UP_STEPS } from "./utils/constants";
import { useSignUpForm } from "./utils/hooks";

export function SignUp() {
  const { form, role, step, submittedEmail, goToDetails, goToRole, submit } =
    useSignUpForm();
  const { title, subtitle } = SIGN_UP_STEPS[step];

  if (step === "submitted")
    return (
      <AuthLayout title={title} subtitle={subtitle} footer={null}>
        <SubmittedStep email={submittedEmail} />
      </AuthLayout>
    );

  return (
    <AuthLayout
      title={title}
      subtitle={subtitle}
      footer={
        <>
          Уже есть аккаунт?{" "}
          <Button variant="link" onClick={() => navigate(AUTH_ROUTES.signIn)}>
            Войти
          </Button>
        </>
      }
    >
      <FormProvider {...form}>
        <StepIndicator step={step} />
        {step === "role" ? (
          <RoleStep onContinue={goToDetails} />
        ) : (
          <SignUpForm role={role} onSubmit={submit} onChangeRole={goToRole} />
        )}
      </FormProvider>
    </AuthLayout>
  );
}
