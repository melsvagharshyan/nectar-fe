import { z } from "zod";
import { PASSWORD_MIN_LENGTH } from "./constants";

export const personalInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Введите имя и фамилию")
    .max(120, "Не длиннее 120 символов"),
  phone: z
    .string()
    .trim()
    .max(40, "Не длиннее 40 символов")
    .regex(/^[+\d\s()-]*$/, "Только цифры, пробелы и символы + − ( )"),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Введите текущий пароль"),
    newPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `Минимум ${PASSWORD_MIN_LENGTH} символов`)
      .max(128, "Не длиннее 128 символов"),
    confirmPassword: z.string().min(1, "Повторите новый пароль"),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  })
  .refine((v) => !v.currentPassword || v.newPassword !== v.currentPassword, {
    path: ["newPassword"],
    message: "Новый пароль должен отличаться от текущего",
  });
