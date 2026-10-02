import type { DemoState } from "../../../demo/types";
import {
  companyOfferCount,
  companyRequestCount,
  matchesSearch,
} from "../../../utils/helpers";
import type { Company, CompanyKind, CompanyStat } from "./types";

export const filterCompanies = (
  state: DemoState,
  kind: CompanyKind,
  search: string,
) =>
  state.companies.filter(
    (c) => c.kind === kind && matchesSearch(`${c.id} ${c.name}`, search),
  );

export const companyStats = (
  state: DemoState,
  c: Company,
): [CompanyStat, CompanyStat] =>
  c.kind === "rf"
    ? [
        {
          label: "Клиенты",
          value: state.clients.filter((x) => x.companyId === c.id).length,
        },
        { label: "Запросы", value: companyRequestCount(state, c.id) },
      ]
    : [
        {
          label: "Объекты",
          value: state.properties.filter((x) => x.companyId === c.id).length,
        },
        { label: "Предложения", value: companyOfferCount(state, c.id) },
      ];
