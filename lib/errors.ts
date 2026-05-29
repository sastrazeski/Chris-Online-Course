type ErrorLike = {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
};

export function toErrorMessage(error: unknown, fallback = "Unexpected error") {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  const value = error as ErrorLike;
  const parts = [value.message, value.details, value.hint, value.code].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : fallback;
}

export function throwReadableError(error: unknown, fallback?: string): never {
  throw new Error(toErrorMessage(error, fallback));
}
