import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().min(1, "Введите email").email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
});
