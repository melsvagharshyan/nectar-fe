import { z } from "zod";
import { DISTRICTS, PROPERTY_TYPES } from "../../../utils/constants";
import { numeric } from "../../../utils/helpers";
import type { FieldErrors } from "../../../utils/types";
import {
  collectErrors,
  createPhoneRule,
  emailRule,
  isBlank,
  nameRule,
  oneOf,
  optionalPositive,
  requiredPositive,
} from "../../../utils/validations";
import { EMPTY_DEMO_FORM_VALUES } from "./constants";
import type { DemoFormKind, DemoFormValues } from "./types";

const demoFormBaseSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  employeeId: z.string(),
  companyKind: z.string(),
  website: z.string(),
  active: z.string(),
  type: z.string(),
  budgetMin: z.string(),
  budgetMax: z.string(),
  areaMin: z.string(),
  areaMax: z.string(),
  rooms: z.string(),
  goal: z.string(),
  term: z.string(),
  notes: z.string(),
  market: z.string(),
  repair: z.string(),
  furniture: z.string(),
  parking: z.string(),
  view: z.string(),
  districts: z.array(z.string()),
  amenities: z.array(z.string()),
});

export const createContactSchema = (phoneRequired: boolean) =>
  demoFormBaseSchema.extend({
    name: nameRule,
    phone: createPhoneRule(phoneRequired),
    email: emailRule,
  });

export const createClientSchema = (employeeIds: string[]) =>
  createContactSchema(true).extend({
    employeeId: oneOf(employeeIds, "Выберите сотрудника своей компании"),
  });

const RANGE_FIELDS = [
  ["budgetMin", "budgetMax"],
  ["areaMin", "areaMax"],
] as const;

export const requestSchema = demoFormBaseSchema
  .extend({
    type: oneOf(PROPERTY_TYPES, "Выберите тип недвижимости"),
    districts: z
      .array(z.string())
      .refine(
        (list) => list.length > 0 && list.every((d) => DISTRICTS.includes(d)),
        "Выберите хотя бы один район",
      ),
    budgetMin: z
      .string()
      .refine(
        (v) =>
          isBlank(v) || (Number.isFinite(numeric(v)) && numeric(v) >= 0),
        "Минимальный бюджет не может быть отрицательным",
      ),
    budgetMax: requiredPositive,
    areaMin: optionalPositive,
    areaMax: optionalPositive,
  })
  .superRefine((values, ctx) => {
    for (const [min, max] of RANGE_FIELDS)
      if (
        !isBlank(values[min]) &&
        !isBlank(values[max]) &&
        numeric(values[min]) > numeric(values[max])
      )
        ctx.addIssue({
          code: "custom",
          path: [min],
          message: "Значение «от» не должно превышать «до»",
        });
  });

const companySchema = demoFormBaseSchema.extend({
  name: nameRule,
  companyKind: oneOf(["rf", "am"], "Выберите тип компании"),
});

export const createDemoFormSchema = (
  kind: DemoFormKind,
  employeeIds: string[],
) =>
  kind === "client"
    ? createClientSchema(employeeIds)
    : kind === "request"
      ? requestSchema
      : kind === "company"
        ? companySchema
        : createContactSchema(true);

const withDefaults = (values: Partial<DemoFormValues>): DemoFormValues => ({
  ...EMPTY_DEMO_FORM_VALUES,
  ...values,
});

export const validateContact = (
  values: Partial<DemoFormValues>,
  phoneRequired = true,
): FieldErrors =>
  collectErrors(createContactSchema(phoneRequired), withDefaults(values));

export const validateClient = (
  values: Partial<DemoFormValues>,
  employeeIds: string[],
): FieldErrors =>
  collectErrors(createClientSchema(employeeIds), withDefaults(values));

export const validateRequest = (
  values: Partial<DemoFormValues>,
  districts: string[],
): FieldErrors =>
  collectErrors(requestSchema, withDefaults({ ...values, districts }));
