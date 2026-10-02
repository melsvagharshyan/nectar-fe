import { z } from "zod";
import { MIN_PASSWORD_LENGTH } from "./constants";

export const signUpSchema = z
  .object({
    role: z.enum(["broker", "partner", "admin"]),
    name: z.string().trim().min(2, "Имя должно содержать минимум 2 символа"),
    email: z
      .string()
      .trim()
      .min(1, "Введите email")
      .email("Введите корректный email"),
    phone: z.string().trim().max(40, "Слишком длинный номер"),
    companyName: z.string().trim(),
    adminCode: z.string().trim(),
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
    if (values.role !== "admin" && values.companyName.length < 2)
      ctx.addIssue({
        code: "custom",
        path: ["companyName"],
        message: "Укажите название компании",
      });
    if (values.role === "admin" && !values.adminCode)
      ctx.addIssue({
        code: "custom",
        path: ["adminCode"],
        message: "Введите код администратора",
      });
  });
