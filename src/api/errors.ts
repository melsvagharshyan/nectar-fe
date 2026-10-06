import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

const FALLBACK = "Не удалось выполнить запрос. Попробуйте ещё раз.";

const isFetchError = (error: unknown): error is FetchBaseQueryError =>
  typeof error === "object" && error !== null && "status" in error;

/** Machine-readable codes the backend adds to some auth errors. */
export type ApiErrorCode =
  | "REGISTRATION_PENDING"
  | "REGISTRATION_REJECTED"
  | "ACCOUNT_BLOCKED";

type ErrorData = { code?: unknown; reason?: unknown } | undefined;

const errorData = (error: FetchBaseQueryError | SerializedError | undefined) =>
  isFetchError(error) ? (error.data as ErrorData) : undefined;

export function getApiErrorCode(
  error: FetchBaseQueryError | SerializedError | undefined,
): ApiErrorCode | undefined {
  const code = errorData(error)?.code;
  return typeof code === "string" ? (code as ApiErrorCode) : undefined;
}

/** The admin's message for a rejected application or a blocked account. */
export function getApiErrorReason(
  error: FetchBaseQueryError | SerializedError | undefined,
): string | undefined {
  const reason = errorData(error)?.reason;
  return typeof reason === "string" && reason ? reason : undefined;
}

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
