import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Account } from "../../../api/accounts-api-ts/types";
import { ControlledField } from "../../../components/form";
import { Button, Overlay, OverlayFooter } from "../../../components/ui";
import { NOTICE } from "../../../utils/styles";
import { BLOCK_REASON_MAX, blockSchema, type BlockValues } from "../utils/validations";

const FORM_ID = "block-account-form";

export function BlockAccountDialog({
  account,
  onCancel,
  onConfirm,
}: {
  account: Account;
  onCancel: () => void;
  onConfirm: (reason: string) => Promise<void>;
}) {
  const { control, handleSubmit, formState } = useForm<BlockValues>({
    defaultValues: { reason: "" },
    resolver: zodResolver(blockSchema),
    mode: "onChange",
  });

  return (
    <Overlay title="Заблокировать аккаунт" modal onClose={onCancel}>
      <form
        id={FORM_ID}
        className="flex flex-col gap-16"
        onSubmit={handleSubmit(({ reason }) => onConfirm(reason))}
        noValidate
      >
        <p className={NOTICE}>
          {account.name} · {account.email}. Доступ пропадёт при следующем действии
          пользователя. Данные компании останутся без изменений.
        </p>
        <ControlledField
          control={control}
          name="reason"
          label="Причина блокировки"
          type="textarea"
          placeholder="Например: жалобы клиентов на недостоверные объекты"
        />
        <p className="-mt-8 text-[12px] text-muted">
          Пользователь увидит эту причину при попытке входа. До {BLOCK_REASON_MAX} символов.
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
          {formState.isSubmitting ? "Блокируем…" : "Заблокировать"}
        </Button>
      </OverlayFooter>
    </Overlay>
  );
}
