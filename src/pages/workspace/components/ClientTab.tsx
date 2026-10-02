import { panel } from "../../../app/router";
import { Avatar, Button } from "../../../components/ui";
import type { Request } from "../../../demo/types";
import { cn } from "../../../utils/helpers";
import { SELECT_TAB } from "../../../utils/styles";
import type { BrokerData } from "../utils/types";
import { CLIENT_TAB, CLIENT_TAB_ACTIVE } from "../utils/styles";
import { ClientRequestMini } from "./ClientRequestMini";

export function ClientTab({
  client: c,
  index,
  active,
  requests,
  activeRequestId,
  offerCount,
  attention,
  onSelect,
  onSelectRequest,
}: {
  client: BrokerData["clients"][number];
  index: number;
  active: boolean;
  requests: Request[];
  activeRequestId?: string;
  offerCount: (requestId: string) => number;
  attention: boolean;
  onSelect: () => void;
  onSelectRequest: (requestId: string) => void;
}) {
  return (
    <div className={cn(CLIENT_TAB, active && CLIENT_TAB_ACTIVE)}>
      <Button className={SELECT_TAB} onClick={onSelect}>
        <div className="flex items-center gap-10">
          <span className="relative">
            <Avatar name={c.name} className="size-40 text-[12px]" />
            <i
              className={cn(
                "absolute right-0 bottom-0 size-11 rounded-full border-2 border-surface",
                attention ? "bg-accent" : "bg-success",
              )}
            />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-6">
              <strong className="truncate text-[14px] font-semibold">{c.name}</strong>
              <span className="font-code text-[11px] text-faint">#{index + 1}</span>
            </div>
            <small className="mt-2 block text-[12px] text-muted">{c.phone}</small>
          </div>
        </div>
      </Button>
      {requests.length > 0 && (
        <div className="mt-10 grid gap-6">
          {requests.map((r) => (
            <ClientRequestMini
              key={r.id}
              request={r}
              active={activeRequestId === r.id}
              offerCount={offerCount(r.id)}
              onSelect={() => onSelectRequest(r.id)}
            />
          ))}
        </div>
      )}
      <div className="mt-8 flex min-h-14 items-center justify-between gap-5 pl-2 text-[11px]">
        <span className="font-medium text-accent-text">
          {attention ? "Требует внимания" : ""}
        </span>
        <Button
          variant="link"
          className="text-[11px] text-muted"
          onClick={() => panel("client", { client: c.id })}
        >
          Подробнее ↗
        </Button>
      </div>
    </div>
  );
}
