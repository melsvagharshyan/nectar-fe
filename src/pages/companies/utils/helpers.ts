import type { CompanyListItem } from "../../../api/companies-api-ts/types";
import type { CompanyStat } from "./types";

export const companyStats = ({
  kind,
  stats: [first, second],
}: CompanyListItem): [CompanyStat, CompanyStat] =>
  kind === "rf"
    ? [
        { label: "Клиенты", value: first },
        { label: "Запросы", value: second },
      ]
    : [
        { label: "Объекты", value: first },
        { label: "Предложения", value: second },
      ];
