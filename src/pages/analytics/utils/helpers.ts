import type { Role } from "../../../demo/types";
import type { MetricCard, MetricView, Metrics } from "./types";

export const metricCards = (role: Role, m: Metrics): MetricCard[] =>
  role === "broker"
    ? [
        { name: "Клиенты", value: m.clients, view: "" },
        { name: "Активные запросы", value: m.activeRequests, view: "active" },
        { name: "Предложения", value: m.offers, view: "offers" },
        { name: "Зарезервировано", value: m.activeTransfers, view: "crm" },
      ]
    : [
        { name: "Активные запросы", value: m.activeRequests, view: "active" },
        { name: "Предложения", value: m.offers, view: "offers" },
        { name: "С интересом", value: m.interested, view: "interested" },
        { name: "Зарезервировано", value: m.activeTransfers, view: "crm" },
        { name: "Продано", value: m.sold, view: "sold" },
      ];

export const metricTarget = (role: Role, view: MetricView) =>
  role === "admin"
    ? { path: "/admin/workspace", params: { view } }
    : {
        path: "/broker/workspace",
        params: view === "crm" ? { stage: "crm" } : {},
      };

export const sortedDistricts = (districts: Record<string, number>) =>
  Object.entries(districts).sort((a, b) => b[1] - a[1]);

export const crmShare = (m: Metrics) =>
  Math.round((m.reachedCrm / Math.max(1, m.requests)) * 1000) / 10;
