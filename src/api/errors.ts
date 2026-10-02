import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

const FALLBACK = "Не удалось выполнить запрос. Попробуйте ещё раз.";

const isFetchError = (error: unknown): error is FetchBaseQueryError =>
  typeof error === "object" && error !== null && "status" in error;

/** Extracts a human-readable message from a NestJS error response. */
export function getApiErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined,
): string {
  if (!error) return FALLBACK;
  if (isFetchError(error)) {
    if (error.status === "FETCH_ERROR")
      return "Сервер недоступен. Проверьте, что backend запущен.";
    const data = error.data as { message?: string | string[] } | undefined;
    const message = Array.isArray(data?.message)
      ? data.message[0]
      : data?.message;
    return message || FALLBACK;
  }
  return error.message || FALLBACK;
}
