import { z } from "zod";
import type { TransferConfirmMode } from "./types";

export const createTransferConfirmSchema = (mode: TransferConfirmMode) =>
  z.object({
    soldPropertyId:
      mode === "sold"
        ? z.string().min(1, "Выберите проданный объект")
        : z.string(),
  });
