import type { PasswordFormValues, PasswordStrength } from "./types";

export const AVATAR_MAX_MB = 5;

export const AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export const AVATAR_HINT = `JPG, PNG, WebP или AVIF, до ${AVATAR_MAX_MB} МБ. Лучше всего — квадратное фото лица.`;

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_DEFAULTS: PasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const PASSWORD_STRENGTH_LABELS: Record<PasswordStrength, string> = {
  0: "",
  1: "Слабый пароль",
  2: "Средний пароль",
  3: "Хороший пароль",
  4: "Надёжный пароль",
};

export const PASSWORD_STRENGTH_COLORS: Record<PasswordStrength, string> = {
  0: "bg-line",
  1: "bg-danger",
  2: "bg-amber-500",
  3: "bg-lime-500",
  4: "bg-emerald-500",
};

export const PROFILE_CARD_HEAD = "mb-18 flex items-start gap-12";

export const PROFILE_CARD_ICON =
  "grid size-36 shrink-0 place-items-center rounded-[10px] bg-accent-tint text-[17px] text-accent-text";
