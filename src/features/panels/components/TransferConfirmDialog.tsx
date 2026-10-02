import { Radio } from "antd";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Property } from "../../../demo/types";
import { Button, Overlay, OverlayFooter } from "../../../components/ui";
import { cn, money } from "../../../utils/helpers";
import type { TransferConfirmMode, TransferConfirmValues } from "../utils/types";
import { createTransferConfirmSchema } from "../utils/validations";
import { NOTICE, RECORD, STACK } from "../../../utils/styles";

export function TransferConfirmDialog({
  mode,
  properties,
  onCancel,
  onConfirm,
}: {
  mode: TransferConfirmMode;
  properties: Property[];
  onCancel: () => void;
  onConfirm: (values: TransferConfirmValues) => void;
}) {
  const { control, handleSubmit } = useForm<TransferConfirmValues>({
    defaultValues: { soldPropertyId: "" },
    resolver: zodResolver(createTransferConfirmSchema(mode)),
  });
  const soldPropertyId = useWatch({ control, name: "soldPropertyId" });
  const isSold = mode === "sold";

  return (
    <Overlay
      title={isSold ? "Какой объект продан?" : "Вернуть запрос в работу?"}
      modal
      onClose={onCancel}
    >
      <form id="transfer-confirm-form" onSubmit={handleSubmit(onConfirm)} noValidate>
        <p className={NOTICE}>
          {isSold
            ? "Проданным станет ровно один выбранный объект. Остальные останутся доступны."
            : "Доступные предложения останутся выбранными. История передачи сохранится."}
        </p>
        {isSold && (
          <Controller
            control={control}
            name="soldPropertyId"
            render={({ field }) => (
              <Radio.Group
                className={cn(STACK, "mt-20 w-full")}
                name={field.name}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              >
                {properties.map((p) => (
                  <div className={RECORD} key={p.id}>
                    <Radio value={p.id} disabled={p.availability !== "active"}>
                      {p.id} · {p.district}
                    </Radio>
                    <strong>{money(p.price)}</strong>
                  </div>
                ))}
              </Radio.Group>
            )}
          />
        )}
        <OverlayFooter>
          <Button onClick={onCancel}>Отмена</Button>
          <Button
            type="submit"
            form="transfer-confirm-form"
            variant="primary"
            disabled={isSold && !soldPropertyId}
          >
            Подтвердить {isSold ? "продажу" : "возврат"}
          </Button>
        </OverlayFooter>
      </form>
    </Overlay>
  );
}
