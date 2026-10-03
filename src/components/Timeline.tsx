import { useDemo } from "../app/DemoProvider";
import { visibleEvents } from "../demo/selectors";
import type { Role } from "../demo/types";
import { EVENT_NAMES } from "../utils/constants";
import { actorForRole, formatDate } from "../utils/helpers";

const TIMELINE_DATE: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

export function Timeline({
  role,
  requestId,
}: {
  role: Role;
  requestId?: string;
}) {
  const [state] = useDemo();
  const events = visibleEvents(state, actorForRole(role)).filter(
    (e) => !requestId || e.requestId === requestId,
  );
  return (
    <>
      <ul className="mb-0 mt-20 list-none p-0 [&_li]:relative [&_li]:pb-20 [&_li]:pl-24 [&_li]:text-[13px] [&_li]:font-medium [&_li:last-child]:pb-0 [&_li]:before:absolute [&_li]:before:top-4 [&_li]:before:left-0 [&_li]:before:z-1 [&_li]:before:box-border [&_li]:before:size-10 [&_li]:before:rounded-full [&_li]:before:bg-accent [&_li]:before:ring-3 [&_li]:before:ring-accent-tint [&_li]:before:content-[''] [&_li]:after:absolute [&_li]:after:top-14 [&_li]:after:-bottom-4 [&_li]:after:left-4 [&_li]:after:w-2 [&_li]:after:rounded-full [&_li]:after:bg-line [&_li]:after:content-[''] [&_li:last-child]:after:hidden [&_small]:mt-6 [&_small]:block [&_small]:font-normal [&_small]:text-muted">
        {events
          .slice()
          .reverse()
          .map((e) => (
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
