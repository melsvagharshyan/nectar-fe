import { z } from "zod";

export const kitFormSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя (минимум 2 символа)"),
  email: z.string().trim().email("Некорректный email"),
  type: z.string().min(1, "Выберите тип недвижимости"),
  budget: z
    .string()
    .refine((v) => v === "" || Number(v) > 0, "Укажите число больше нуля"),
  districts: z.array(z.string()).min(1, "Выберите хотя бы один район"),
  notes: z.string().max(240, "Не более 240 символов"),
});
