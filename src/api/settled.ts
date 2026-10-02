/**
 * Resolves `queryFulfilled` to its data, or `null` on failure. Failures are
 * already surfaced through the hook's `error`, so swallowing them here avoids
 * unhandled promise rejections inside `onQueryStarted`.
 */
export async function settled<T>(
  promise: Promise<{ data: T }>,
): Promise<T | null> {
  try {
    return (await promise).data;
  } catch {
    return null;
  }
}
