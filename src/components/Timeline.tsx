import { skipToken } from "@reduxjs/toolkit/query";
import { useGetNotificationsInfiniteQuery } from "../api/notifications-api-ts/notificationsApi";
import { useGetRequestEventsQuery } from "../api/requests-api-ts/requestsApi";
import { EVENT_NAMES } from "../utils/constants";
import { formatDate } from "../utils/helpers";

const TIMELINE_DATE: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

/** Request history when `requestId` is given, otherwise the latest events the role can see. */
export function Timeline({ requestId }: { requestId?: string }) {
  const history = useGetRequestEventsQuery(requestId ?? skipToken);
  const latest = useGetNotificationsInfiniteQuery(
    requestId ? skipToken : { filter: "all" },
  );
  const events = requestId
    ? (history.data?.items ?? [])
    : (latest.data?.pages[0]?.items ?? []);
  return (
    <>
      <ul className="mb-0 mt-20 list-none p-0 [&_li]:relative [&_li]:pb-20 [&_li]:pl-24 [&_li]:text-[13px] [&_li]:font-medium [&_li:last-child]:pb-0 [&_li]:before:absolute [&_li]:before:top-4 [&_li]:before:left-0 [&_li]:before:z-1 [&_li]:before:box-border [&_li]:before:size-10 [&_li]:before:rounded-full [&_li]:before:bg-accent [&_li]:before:ring-3 [&_li]:before:ring-accent-tint [&_li]:before:content-[''] [&_li]:after:absolute [&_li]:after:top-14 [&_li]:after:-bottom-4 [&_li]:after:left-4 [&_li]:after:w-2 [&_li]:after:rounded-full [&_li]:after:bg-line [&_li]:after:content-[''] [&_li:last-child]:after:hidden [&_small]:mt-6 [&_small]:block [&_small]:font-normal [&_small]:text-muted">
        {events.map((e) => (
          <li key={e.id}>
            {EVENT_NAMES[e.type]} · {e.requestId}
            {e.propertyId ? " · " + e.propertyId : ""}
            <small>{formatDate(e.createdAt, TIMELINE_DATE)}</small>
          </li>
        ))}
        {!events.length && <li>Событий пока нет</li>}
      </ul>
    </>
  );
}
