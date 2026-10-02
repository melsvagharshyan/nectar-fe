import type { TabItem } from "../../../components/ui";
import type { PartnerOfferFilter } from "./types";

export const PARTNER_OFFER_TABS: TabItem<PartnerOfferFilter>[] = [
  { id: "", label: "Все" },
  { id: "sent", label: "Отправлены" },
  { id: "interested", label: "Заинтересованы" },
  { id: "transferred", label: "Передано в CRM" },
  { id: "closed", label: "Закрыты / недоступны" },
];

export const CLOSED_OFFER_STATES = ["closed", "unavailable"];
