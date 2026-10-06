import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Registration } from "../../../api/registrations-api-ts/types";
import { ControlledField } from "../../../components/form";
import { Button, Overlay, OverlayFooter } from "../../../components/ui";
import { NOTICE } from "../../../utils/styles";
import { REJECT_REASON_MAX } from "../utils/constants";
import type { RejectValues } from "../utils/types";
import { rejectSchema } from "../utils/validations";

const FORM_ID = "registration-reject-form";

/** The message is required: the applicant reads it when they try to sign in. */
export function RejectDialog({
  registration,
  onCancel,
  onConfirm,
}: {
  registration: Registration;
  onCancel: () => void;
  onConfirm: (reason: string) => Promise<void>;
}) {
  const { control, handleSubmit, formState } = useForm<RejectValues>({
    defaultValues: { reason: "" },
    resolver: zodResolver(rejectSchema),
    mode: "onChange",
  });

  return (
    <Overlay title="Отклонить заявку" modal onClose={onCancel}>
      <form
        id={FORM_ID}
        className="flex flex-col gap-16"
        onSubmit={handleSubmit(({ reason }) => onConfirm(reason))}
        noValidate
      >
        <p className={NOTICE}>
          {registration.name} · {registration.companyName} · {registration.email}
        </p>
        <ControlledField
          control={control}
          name="reason"
          label="Сообщение заявителю"
          type="textarea"
          placeholder="Например: не удалось проверить агентство, укажите сайт или ИНН"
        />
        <p className="-mt-8 text-[12px] text-muted">
          Этот текст увидит пользователь при попытке входа. До {REJECT_REASON_MAX} символов.
        </p>
      </form>
      <OverlayFooter>
        <Button onClick={onCancel}>Отмена</Button>
        <Button
          type="submit"
          form={FORM_ID}
          variant="primary"
          className="border-danger bg-danger hover:not-disabled:border-danger hover:not-disabled:bg-danger hover:not-disabled:brightness-110"
          disabled={!formState.isValid || formState.isSubmitting}
        >
          {formState.isSubmitting ? "Отклоняем…" : "Отклонить заявку"}
        </Button>
      </OverlayFooter>
    </Overlay>
  );
}
