import type { SignUpRole } from "../../../api/auth-api-ts/types";
import type { RegistrationStatus } from "../../../api/registrations-api-ts/types";
import type { SelectOption } from "../../../utils/types";
import type { RegistrationFilters } from "./types";

export const REGISTRATION_STATUSES: RegistrationStatus[] = ["pending", "approved", "rejected"];

export const STATUS_TAB_LABELS: Record<RegistrationStatus, string> = {
  pending: "Новые",
  approved: "Одобренные",
  rejected: "Отклонённые",
};

export const EMPTY_TEXT: Record<RegistrationStatus, string> = {
  pending: "Новых заявок нет",
  approved: "Одобренных заявок нет",
  rejected: "Отклонённых заявок нет",
};

/** Same short tags as the sign-up role cards. */
export const ROLE_TAGS: Record<SignUpRole, string> = { broker: "RU", partner: "AM" };

export const ROLE_LABELS: Record<SignUpRole, string> = {
  broker: "Брокер РФ",
  partner: "Брокер АМ",
};

export const ROLE_FILTER_OPTIONS: SelectOption[] = (["broker", "partner"] as const).map(
  (value) => ({ value, label: ROLE_LABELS[value] }),
);

export const REGISTRATION_FILTER_DEFAULTS: RegistrationFilters = { search: "", role: "" };

/** Mirrors the backend rule for the rejection message. */
export const REJECT_REASON_MIN = 3;
export const REJECT_REASON_MAX = 500;
