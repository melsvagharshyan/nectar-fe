/** "12 окт., 14:05" */
export const formatDateTime = (date: string) =>
  new Date(date).toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
