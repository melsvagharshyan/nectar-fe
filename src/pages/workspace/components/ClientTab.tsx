import { useEffect, useId, useState, type ReactNode } from "react";
import { panel } from "../../../app/router";
import { Avatar, Button, Count, Icon } from "../../../components/ui";
import { cn } from "../../../utils/helpers";
import { SELECT_TAB } from "../../../utils/styles";
import type { BrokerData } from "../utils/types";
import {
  ACCORDION_BODY,
  ACCORDION_BODY_OPEN,
  CLIENT_TAB,
  CLIENT_TAB_ACTIVE,
  COUNT_TONE,
} from "../utils/styles";

/** A client row that expands into its requests (`children`) while selected. */
export function ClientTab({
  client: c,
  index,
  active,
  requestCount,
  attention,
  onSelect,
  children,
}: {
  client: BrokerData["clients"][number];
  index: number;
  active: boolean;
  requestCount?: number;
  attention: boolean;
  onSelect: () => void;
  children?: ReactNode;
}) {
  const bodyId = useId();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if (active) setCollapsed(false);
  }, [active]);
  const open = active && !collapsed;

  return (
    <div className={cn(CLIENT_TAB, active && CLIENT_TAB_ACTIVE)}>
      <Button
        className={SELECT_TAB}
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={active ? () => setCollapsed((v) => !v) : onSelect}
      >
        <div className="flex items-center gap-10">
          <Avatar name={c.name} className="size-40 text-[12px]" />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-6">
              <strong className="truncate text-[14px] font-semibold">{c.name}</strong>
              <span className="font-code text-[11px] text-faint">#{index + 1}</span>
            </div>
            <small className="mt-2 flex items-center gap-6 text-[12px] text-muted">
              {attention && (
                <span
                  className="size-6 shrink-0 rounded-full bg-accent"
                  role="img"
                  aria-label="Требует внимания"
                />
              )}
              <span className="truncate">{c.phone}</span>
            </small>
          </div>
          {requestCount !== undefined && (
            <Count
              className={cn(COUNT_TONE, "shrink-0 bg-surface text-accent-text")}
              title="Запросы клиента"
            >
              {requestCount}
            </Count>
          )}
          <Icon
            name="chevron"
            className={cn(
              "size-14 shrink-0 text-faint transition-transform",
              open && "rotate-180 text-accent-text",
            )}
          />
        </div>
      </Button>
      <div id={bodyId} className={cn(ACCORDION_BODY, open && ACCORDION_BODY_OPEN)}>
        <div className="min-h-0 overflow-hidden" inert={!open}>
          <div className="pt-12">
            {children}
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
        </div>
      </div>
    </div>
  );
}
