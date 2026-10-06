import { z } from "zod";
import { REJECT_REASON_MAX, REJECT_REASON_MIN } from "./constants";

export const rejectSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(REJECT_REASON_MIN, "Напишите заявителю, почему заявка отклонена")
    .max(REJECT_REASON_MAX, `Не больше ${REJECT_REASON_MAX} символов`),
});
