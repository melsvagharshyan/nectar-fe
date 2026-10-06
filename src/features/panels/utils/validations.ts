import { z } from "zod";
import type { TransferConfirmMode } from "./types";

export const createTransferConfirmSchema = (mode: TransferConfirmMode) =>
  z.object({
    soldPropertyId:
      mode === "sold"
        ? z.string().min(1, "Выберите проданный объект")
        : z.string(),
    returnReason:
      mode === "return"
        ? z
            .string()
            .trim()
            .min(3, "Укажите причину возврата")
            .max(500, "Не более 500 символов")
        : z.string(),
  });

export const reviewRejectSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(3, "Укажите причину отказа")
    .max(500, "Не более 500 символов"),
});

export const BLOCK_REASON_MAX = 500;

/** Mirrors the backend rule; the user reads the reason when they try to sign in. */
export const blockSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(3, "Укажите причину блокировки")
    .max(BLOCK_REASON_MAX, `Не больше ${BLOCK_REASON_MAX} символов`),
});

export type BlockValues = z.infer<typeof blockSchema>;
