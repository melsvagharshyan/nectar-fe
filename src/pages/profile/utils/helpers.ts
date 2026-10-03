import { formatDate } from "../../../utils/helpers";
import { AVATAR_MAX_MB, AVATAR_TYPES, PASSWORD_MIN_LENGTH } from "./constants";
import type { PasswordStrength } from "./types";

/** Returns a user-facing reason why the file can't be an avatar, or `null` if it's fine. */
export function getAvatarFileError(file: File): string | null {
  if (!AVATAR_TYPES.includes(file.type)) return "Выберите изображение JPG, PNG, WebP или AVIF";
  if (file.size > AVATAR_MAX_MB * 1024 * 1024)
    return `Файл весит больше ${AVATAR_MAX_MB} МБ — выберите фото поменьше`;
  return null;
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return 0;
  const checks = [
    password.length >= PASSWORD_MIN_LENGTH,
    password.length >= 12,
    /[a-zа-яё]/.test(password) && /[A-ZА-ЯЁ]/.test(password),
    /\d/.test(password),
    /[^\p{L}\d]/u.test(password),
  ];
  const score = checks.filter(Boolean).length;
  if (password.length < PASSWORD_MIN_LENGTH || score <= 1) return 1;
  return Math.min(score - 1, 4) as PasswordStrength;
}

export const formatMemberSince = (createdAt: string | undefined) =>
  createdAt ? formatDate(createdAt, { month: "long", year: "numeric" }) : null;
