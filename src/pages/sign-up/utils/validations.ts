import { z } from "zod";
import { MIN_PASSWORD_LENGTH } from "./constants";

export const signUpSchema = z
  .object({
    role: z.enum(["broker", "partner"]),
    name: z
      .string()
      .trim()
      .min(1, "Введите имя и фамилию")
      .min(2, "Имя должно содержать минимум 2 символа"),
    email: z
      .string()
      .trim()
      .min(1, "Введите email")
      .email("Введите корректный email"),
    phone: z.string().trim().max(40, "Слишком длинный номер"),
    companyName: z
      .string()
      .trim()
      .min(2, "Укажите название компании")
      .max(160, "Слишком длинное название"),
    password: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Пароль должен содержать минимум ${MIN_PASSWORD_LENGTH} символов`,
      ),
    confirmPassword: z.string(),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword)
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Пароли не совпадают",
      });
  });
