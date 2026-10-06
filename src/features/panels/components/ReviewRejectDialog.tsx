import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledField } from "../../../components/form";
import { Button, Overlay, OverlayFooter } from "../../../components/ui";
import type { ReviewRejectValues } from "../utils/types";
import { reviewRejectSchema } from "../utils/validations";
import { NOTICE } from "../../../utils/styles";

/** Admin rejection of a request or an offer, with a reason its author sees. */
export function ReviewRejectDialog({
  title,
  notice,
  submitLabel,
  onCancel,
  onConfirm,
}: {
  title: string;
  notice: string;
  submitLabel: string;
  onCancel: () => void;
  onConfirm: (values: ReviewRejectValues) => Promise<void>;
}) {
  const { control, handleSubmit, formState } = useForm<ReviewRejectValues>({
    defaultValues: { reason: "" },
    resolver: zodResolver(reviewRejectSchema),
  });

  return (
    <Overlay title={title} modal onClose={onCancel}>
      <form id="review-reject-form" onSubmit={handleSubmit(onConfirm)} noValidate>
        <p className={NOTICE}>{notice}</p>
        <div className="mt-20">
          <ControlledField
            control={control}
            name="reason"
            label="Причина отказа"
            type="textarea"
            placeholder="Например: уточните бюджет и районы"
          />
        </div>
        <OverlayFooter>
          <Button onClick={onCancel}>Отмена</Button>
          <Button
            type="submit"
            form="review-reject-form"
            variant="primary"
            disabled={formState.isSubmitting}
          >
            {submitLabel}
          </Button>
        </OverlayFooter>
      </form>
    </Overlay>
  );
}
