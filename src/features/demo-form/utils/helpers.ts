import type {
  ClientPayload,
  CompanyPayload,
  EmployeePayload,
  RequestPayload,
} from "../../../api/records-api-ts/types";
import type { DemoState, Role } from "../../../demo/types";
import { cleanNumber, currentCompanyId, numeric } from "../../../utils/helpers";
import { NOT_IMPORTANT } from "./constants";
import type {
  DemoFormProps,
  DemoFormRecords,
  DemoFormValues,
} from "./types";

export function resolveDemoFormRecords(
  state: DemoState,
  { kind, id, clientId, companyId }: DemoFormProps,
  role: Role,
): DemoFormRecords {
  const request =
    kind === "request" ? state.requests.find((r) => r.id === id) : undefined;
  const relatedClientId =
    kind === "request" ? (request?.clientId ?? clientId) : id;
  const employee =
    kind === "employee" ? state.employees.find((e) => e.id === id) : undefined;
  const defaultScope = currentCompanyId();
  const company =
    companyId ??
    (kind === "client" || kind === "request"
      ? state.clients.find((c) => c.id === relatedClientId)?.companyId
      : kind === "employee"
        ? employee?.companyId
        : id) ??
    defaultScope;
  const client = state.clients.find(
    (c) => c.id === (kind === "client" ? id : clientId),
  );
  const requestClient =
    state.clients.find((c) => c.id === request?.clientId) ?? client;
  const existingCompany =
    kind === "company" && id
      ? state.companies.find((c) => c.id === id)
      : undefined;
  const staff = state.employees.filter(
    (e) =>
      e.companyId === company && (e.active || e.id === client?.employeeId),
  );

  const recordCompany =
    kind === "client"
      ? client?.companyId
      : kind === "request"
        ? requestClient?.companyId
        : kind === "employee"
          ? employee?.companyId
          : existingCompany?.id;
  const record =
    kind === "client"
      ? client
      : kind === "request"
        ? request
        : kind === "employee"
          ? employee
          : existingCompany;
  const outOfScope =
    role !== "admin" &&
    (company !== defaultScope ||
      (!!recordCompany && recordCompany !== defaultScope) ||
      (role === "partner" && (kind === "client" || kind === "request")));
  const unavailable =
    outOfScope ||
    (!!id && !record) ||
    (kind === "request" && !requestClient);

  return {
    company,
    client,
    request,
    requestClient,
    employee,
    existingCompany,
    staff,
    unavailable,
  };
}

/** Rooms chips: "Студия" is stored as 0 and "5+" as 5. */
const roomsToChip = (rooms: number | null | undefined) =>
  rooms === 0 ? "Студия" : rooms && rooms >= 5 ? "5+" : cleanNumber(rooms);

const chipToRooms = (chip: string) =>
  chip === "" ? null : chip === "Студия" ? 0 : parseInt(chip, 10);

const preference = (value: string) => (value === NOT_IMPORTANT ? "" : value);

export function buildDemoFormDefaults(
  kind: DemoFormProps["kind"],
  { client, employee, existingCompany, request, staff }: DemoFormRecords,
): DemoFormValues {
  return {
    name:
      kind === "client"
        ? (client?.name ?? "")
        : kind === "employee"
          ? (employee?.name ?? "")
          : (existingCompany?.name ?? ""),
    phone: kind === "client" ? (client?.phone ?? "") : (employee?.phone ?? ""),
    email: kind === "client" ? (client?.email ?? "") : "",
    employeeId: client?.employeeId ?? staff[0]?.id ?? "",
    companyKind: existingCompany?.kind ?? "rf",
    website: existingCompany?.contact ?? "",
    active: employee?.active === false ? "Неактивен" : "Активен",
    type: request?.type ?? "Квартира",
    budgetMin: cleanNumber(request?.budgetMin),
    budgetMax: cleanNumber(request?.budgetMax),
    areaMin: cleanNumber(request?.areaMin),
    areaMax: cleanNumber(request?.areaMax),
    rooms: roomsToChip(request?.rooms),
    goal: request?.goal ?? "Проживание",
    term: request?.term ?? "1–3 месяца",
    notes: request?.notes ?? "",
    market: request?.market || NOT_IMPORTANT,
    repair: request?.repair || NOT_IMPORTANT,
    furniture: request?.furniture || NOT_IMPORTANT,
    parking: request?.parking || NOT_IMPORTANT,
    view: request?.view || NOT_IMPORTANT,
    districts: request?.districts ?? [],
    amenities: request?.amenities ?? [],
  };
}

export const toClientPayload = (v: DemoFormValues): ClientPayload => ({
  name: v.name.trim(),
  phone: v.phone.trim(),
  email: v.email.trim(),
  employeeId: v.employeeId,
});

export const toRequestPayload = (
  v: DemoFormValues,
  withRooms: boolean,
): RequestPayload => ({
  type: v.type,
  districts: v.districts,
  budgetMin: Math.round(numeric(v.budgetMin)),
  budgetMax: Math.round(numeric(v.budgetMax)),
  areaMin: numeric(v.areaMin),
  areaMax: numeric(v.areaMax),
  rooms: withRooms ? chipToRooms(v.rooms) : null,
  goal: v.goal,
  term: v.term,
  notes: v.notes.trim(),
  market: preference(v.market),
  repair: preference(v.repair),
  furniture: preference(v.furniture),
  parking: preference(v.parking),
  view: preference(v.view),
  amenities: v.amenities,
});

export const toCompanyPayload = (v: DemoFormValues): CompanyPayload => ({
  kind: v.companyKind === "am" ? "am" : "rf",
  name: v.name.trim(),
  contact: v.website.trim(),
});

export const toEmployeePayload = (v: DemoFormValues): EmployeePayload => ({
  name: v.name.trim(),
  phone: v.phone.trim(),
  active: v.active !== "Неактивен",
});
