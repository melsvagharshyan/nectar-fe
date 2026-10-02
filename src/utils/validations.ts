import { z } from "zod";
import { numeric } from "./helpers";
import type { FieldErrors } from "./types";

const POSITIVE_MESSAGE = "Укажите число больше нуля";
const PHONE_PATTERN = /^[+\d\s()\-]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isBlank = (value: string) => !value.trim();

export const isPositiveNumber = (value: string) =>
  Number.isFinite(numeric(value)) && numeric(value) > 0;

export const requiredPositive = z
  .string()
  .refine((v) => !isBlank(v) && isPositiveNumber(v), POSITIVE_MESSAGE);

export const optionalPositive = z
  .string()
  .refine((v) => isBlank(v) || isPositiveNumber(v), POSITIVE_MESSAGE);

export const oneOf = (options: readonly string[], message: string) =>
  z.string().refine((v) => options.includes(v), message);

export const nameRule = z
  .string()
  .refine((v) => !isBlank(v), "Укажите имя или название");

const phoneDigits = (phone: string) => phone.replace(/\D/g, "").length;

export const createPhoneRule = (required: boolean) =>
  z.string().superRefine((value, ctx) => {
    const phone = value.trim();
    if (!phone) {
      if (required)
        ctx.addIssue({
          code: "custom",
          message: "Укажите телефон",
        });
      return;
    }
    if (
      !PHONE_PATTERN.test(phone) ||
      phoneDigits(phone) < 9 ||
      phoneDigits(phone) > 15
    )
      ctx.addIssue({
        code: "custom",
        message: "Введите телефон, например +7 999 123-45-67",
      });
  });

export const emailRule = z
  .string()
  .refine(
    (v) => isBlank(v) || EMAIL_PATTERN.test(v.trim()),
    "Проверьте формат email",
  );

export function collectErrors(
  schema: z.ZodType,
  values: unknown,
): FieldErrors {
  const result = schema.safeParse(values);
  const errors: FieldErrors = {};
  if (result.success) return errors;
  for (const issue of result.error.issues) {
    const key = String(issue.path[0]);
    if (!(key in errors)) errors[key] = issue.message;
  }
  return errors;
}
