import type { PropertyPayload } from "../../../api/records-api-ts/types";
import type { Property, Role } from "../../../demo/types";
import type { PropertyCardData } from "../../../components/property-card";
import {
  APARTMENT_TYPES,
  TYPES_WITHOUT_ROOMS,
} from "../../../utils/constants";
import { cleanNumber, currentCompanyId, numeric } from "../../../utils/helpers";
import { PREVIEW_FALLBACK_ID } from "./constants";
import type { PropertyFormValues } from "./types";

const roomsToOption = (rooms: number | null | undefined) =>
  rooms === 0 ? "Студия" : cleanNumber(rooms);

const optionToRooms = (option: string) =>
  option === "" ? null : option === "Студия" ? 0 : parseInt(option, 10);

const optionalNumber = (value: string) =>
  value.trim() === "" || !Number.isFinite(numeric(value)) ? null : numeric(value);

export const buildPropertyDefaults = (
  property?: Property,
): PropertyFormValues => ({
  type: property?.type ?? "Квартира",
  market: property?.market ?? "",
  district: property?.district ?? "",
  price: cleanNumber(property?.price),
  area: cleanNumber(property?.area),
  rooms: roomsToOption(property?.rooms),
  floor: cleanNumber(property?.floor),
  floors: cleanNumber(property?.floors),
  ceiling: cleanNumber(property?.ceiling),
  description: property?.description ?? "",
  privateNotes: property?.privateNotes ?? "",
  internalAddress: property?.internalAddress ?? "",
  location: property?.location ?? "",
  repair: property?.repair ?? "",
  furniture: property?.furniture ?? "",
  parking: property?.parking ?? "",
  bathroom: property?.bathroom ?? "",
  balcony: property?.balcony ?? "",
  building: property?.building ?? "",
  media: property?.media ?? [],
  amenities: property?.amenities ?? [],
});

export function toPropertyPayload(
  v: PropertyFormValues,
  publish: boolean,
): PropertyPayload {
  const isLand = v.type === "Участок";
  const isApartment = APARTMENT_TYPES.includes(v.type);
  return {
    publish,
    type: v.type,
    market: v.market,
    district: v.district,
    price: Math.round(numeric(v.price)),
    area: numeric(v.area),
    rooms: TYPES_WITHOUT_ROOMS.includes(v.type) ? null : optionToRooms(v.rooms),
    floor: isApartment ? optionalNumber(v.floor) : null,
    floors: isApartment ? optionalNumber(v.floors) : null,
    ceiling: isApartment ? optionalNumber(v.ceiling) : null,
    location: v.location.trim(),
    internalAddress: v.internalAddress.trim(),
    description: v.description.trim(),
    privateNotes: v.privateNotes.trim(),
    repair: v.repair,
    furniture: isLand ? "" : v.furniture,
    parking: v.parking,
    bathroom: isLand ? "" : v.bathroom,
    balcony: isLand ? "" : v.balcony,
    building: v.building,
    amenities: v.amenities,
    media: v.media,
  };
}

const nonNegative = (value: string) =>
  Number.isFinite(numeric(value)) ? Math.max(0, numeric(value)) : 0;

export const buildPreview = (
  values: PropertyFormValues,
  property?: Property,
): PropertyCardData => ({
  id: property?.id ?? PREVIEW_FALLBACK_ID,
  title:
    values.type === "Квартира"
      ? `${values.rooms || "—"}-комнатная квартира`
      : values.type,
  type: values.type,
  district: values.district || "Выберите район",
  price: nonNegative(values.price),
  area: nonNegative(values.area),
  rooms: optionToRooms(values.rooms) ?? undefined,
  floor: nonNegative(values.floor) || undefined,
  floors: nonNegative(values.floors) || undefined,
  ceiling: nonNegative(values.ceiling) || undefined,
  description: values.description.trim(),
  availability: property?.availability ?? "draft",
  location: values.location.trim(),
  repair: values.repair,
  bathroom: values.bathroom,
  balcony: values.balcony,
  building: values.building,
  media: values.media,
});

export const segmentLabel = (name: string, option: string) =>
  name === "market"
    ? option === "Новостройка"
      ? "Новостр."
      : "Втор."
    : option === "Студия"
      ? "Ст"
      : option === "5"
        ? "5+"
        : option;

export const editorTitle = (propertyId?: string) =>
  propertyId
    ? `РЕДАКТИРОВАНИЕ ОБЪЕКТА #${propertyId.replace("BR-", "")}`
    : "ДОБАВЛЕНИЕ НОВОГО ОБЪЕКТА";

export const isEditorUnavailable = (
  role: Role,
  propertyId?: string,
  property?: Property,
) =>
  role === "broker" ||
  (role === "admin" && !propertyId) ||
  (!!propertyId && !property) ||
  (role === "partner" &&
    !!property &&
    property.companyId !== currentCompanyId());
