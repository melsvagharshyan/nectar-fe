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
      <ul className="mt-20 list-none p-0 [&_li]:relative [&_li]:border-l [&_li]:border-line-strong [&_li]:pb-20 [&_li]:pl-22 [&_li]:text-[13px] [&_li]:font-medium [&_li]:before:absolute [&_li]:before:top-4 [&_li]:before:-left-5 [&_li]:before:size-9 [&_li]:before:rounded-full [&_li]:before:border-2 [&_li]:before:border-surface [&_li]:before:bg-accent [&_li]:before:content-[''] [&_small]:mt-6 [&_small]:block">
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
