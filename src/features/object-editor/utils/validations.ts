import { z } from "zod";
import {
  APARTMENT_TYPES,
  DISTRICTS,
  PROPERTY_TYPES,
} from "../../../utils/constants";
import { numeric } from "../../../utils/helpers";
import type { FieldErrors } from "../../../utils/types";
import {
  collectErrors,
  isBlank,
  isPositiveNumber,
  oneOf,
  requiredPositive,
} from "../../../utils/validations";
import { EMPTY_PROPERTY_FORM_VALUES } from "./constants";
import type { PropertyFormValues } from "./types";

const FLOOR_FIELDS = ["floor", "floors"] as const;

const propertyBaseSchema = z.object({
  type: z.string(),
  market: z.string(),
  district: z.string(),
  price: z.string(),
  area: z.string(),
  rooms: z.string(),
  floor: z.string(),
  floors: z.string(),
  ceiling: z.string(),
  description: z.string(),
  privateNotes: z.string(),
  internalAddress: z.string(),
  location: z.string(),
  repair: z.string(),
  furniture: z.string(),
  parking: z.string(),
  bathroom: z.string(),
  balcony: z.string(),
  building: z.string(),
  media: z.array(z.string()),
  amenities: z.array(z.string()),
});

const isPositiveInteger = (value: string) =>
  Number.isInteger(numeric(value)) && numeric(value) > 0;

export const createPropertySchema = (publish: boolean) =>
  propertyBaseSchema
    .extend({
      type: oneOf(PROPERTY_TYPES, "Выберите тип недвижимости"),
      district: oneOf(DISTRICTS, "Выберите район"),
      price: requiredPositive,
      area: requiredPositive,
      ceiling: z
        .string()
        .refine(
          (v) => isBlank(v) || isPositiveNumber(v),
          "Укажите высоту больше нуля",
        ),
      media: publish
        ? z.array(z.string()).min(1, "Загрузите хотя бы одно фото")
        : z.array(z.string()),
      description: publish
        ? z
            .string()
            .refine((v) => !isBlank(v), "Добавьте краткое публичное описание")
        : z.string(),
    })
    .superRefine((values, ctx) => {
      if (!APARTMENT_TYPES.includes(values.type)) return;
      for (const key of FLOOR_FIELDS)
        if (!isBlank(values[key]) && !isPositiveInteger(values[key]))
          ctx.addIssue({
            code: "custom",
            path: [key],
            message: "Укажите целое число больше нуля",
          });
      if (
        !isBlank(values.floor) &&
        !isBlank(values.floors) &&
        numeric(values.floor) > numeric(values.floors)
      )
        ctx.addIssue({
          code: "custom",
          path: ["floor"],
          message: "Этаж не может быть выше этажности",
        });
    });

export const validateProperty = (
  values: Partial<PropertyFormValues>,
  media: string[],
  publish = false,
): FieldErrors =>
  collectErrors(createPropertySchema(publish), {
    ...EMPTY_PROPERTY_FORM_VALUES,
    ...values,
    media,
  });
