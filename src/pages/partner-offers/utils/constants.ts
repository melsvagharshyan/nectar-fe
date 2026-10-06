import type { TabItem } from "../../../components/ui";
import type { PartnerOfferFilter } from "./types";

export const PARTNER_OFFER_TABS: TabItem<PartnerOfferFilter>[] = [
  { id: "", label: "Все" },
  { id: "review", label: "На проверке" },
  { id: "declined", label: "Отклонены" },
  { id: "sent", label: "Отправлены" },
  { id: "interested", label: "Заинтересованы" },
  { id: "transferred", label: "Зарезервировано" },
  { id: "closed", label: "Закрыты / недоступны" },
];
