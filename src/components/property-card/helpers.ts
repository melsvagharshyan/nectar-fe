import { money } from "../../utils/helpers";
import type {
  PropertyCardData,
  PropertyCardVariant,
  PropertySpec,
} from "./types";

const pricePerArea = (p: PropertyCardData) =>
  p.area > 0 ? p.price / p.area : 0;

const usd = (n: number) => "$" + n.toLocaleString("en-US");

export const formatCardPrice = (
  p: PropertyCardData,
  variant: PropertyCardVariant,
) => (variant === "immersive" ? usd(p.price) : money(p.price));

export const formatCardPricePerArea = (
  p: PropertyCardData,
  variant: PropertyCardVariant,
) =>
  (variant === "immersive"
    ? usd(Math.floor(pricePerArea(p)))
    : money(pricePerArea(p))) + " / м²";

const roomsLabel = (rooms?: number | null) =>
  rooms === 0 ? "студия" : rooms ? `${rooms}-комн.` : "";

export const cardTitle = (p: PropertyCardData) =>
  p.rooms === 0
    ? `Студия · ${p.area} м²`
    : `${roomsLabel(p.rooms)} ${p.type.toLowerCase()} · ${p.area} м²`.trim();

export const cardLocation = (p: PropertyCardData) =>
  [p.district, p.location].filter(Boolean).join(" • ");

const floorLabel = (p: PropertyCardData) =>
  p.floor ? (p.floors ? `${p.floor}/${p.floors}` : String(p.floor)) : "—";

export const compactSpecs = (p: PropertyCardData): PropertySpec[] => [
  { label: "Площадь", value: `${p.area} м²` },
  { label: "Комнаты", value: p.rooms === 0 ? "Ст" : p.rooms ? String(p.rooms) : "—" },
  { label: "Этаж", value: floorLabel(p) },
];

/** Detailed specs for the immersive card; unfilled fields are skipped. */
export const detailedSpecs = (p: PropertyCardData): PropertySpec[] =>
  [
    { label: "Этажность", value: p.floor ? floorLabel(p) : "" },
    { label: "Потолки", value: p.ceiling ? `${p.ceiling} м` : "" },
    { label: "Санузел", value: p.bathroom ?? "" },
    { label: "Балкон", value: p.balcony ?? "" },
    { label: "Ремонт", value: p.repair ?? "" },
    { label: "Тип дома", value: p.building ?? "" },
  ].filter((spec) => spec.value);
