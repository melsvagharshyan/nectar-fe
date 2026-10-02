import { panel } from "../../../app/router";
import { Badge, Button, Icon } from "../../../components/ui";
import type { Request } from "../../../demo/types";
import { cn, formatDate } from "../../../utils/helpers";
import { SELECT_TAB } from "../../../utils/styles";
import { requestBudget } from "../utils/helpers";
import {
  REQUEST_BOX,
  REQUEST_LINK,
  REQUEST_LINK_LAST,
  REQUEST_TAB,
  REQUEST_TAB_ACTIVE,
} from "../utils/styles";

const PARAMETER_ROW =
  "flex justify-between gap-8 py-3 text-muted [&>b]:text-right [&>b]:font-semibold [&>b]:text-ink-soft";

export function RequestTab({
  request: r,
  active,
  admin,
  onSelect,
}: {
  request: Request;
  active: boolean;
  admin: boolean;
  onSelect: () => void;
}) {
  const params = { client: r.clientId, request: r.id };
  const links = [
    { label: "Параметры", open: () => panel("request", params) },
    { label: "История", open: () => panel("history", params) },
    ...(admin
      ? []
      : [
          {
            label: "Изменить",
            open: () => panel("request-form", { ...params, mode: "edit" }),
          },
        ]),
  ];
  return (
    <div className={cn(REQUEST_TAB, active && REQUEST_TAB_ACTIVE)}>
      <Button className={SELECT_TAB} onClick={onSelect}>
        <div className="flex flex-wrap items-center gap-6">
          <span className="rounded-full bg-accent-tint px-8 py-3 font-code text-[11px] font-semibold text-accent-text">
            {r.id}
          </span>
          <Badge value={r.stage} />
          <span className="ml-auto flex items-center gap-4 text-[11px] text-faint">
            <Icon name="calendar" className="size-12" />
            {formatDate(r.createdAt)}
          </span>
        </div>
        <div className="mt-10 text-[15px] font-bold tracking-[-0.2px]">
          {requestBudget(r)}
        </div>
        <div className={REQUEST_BOX}>
          <small>Параметры объекта</small>
          <div className={PARAMETER_ROW}>
            <span>Тип:</span>
            <b>
              {r.rooms ? `${r.rooms}-комн. ` : ""}
              {r.type}
            </b>
          </div>
          <div className={PARAMETER_ROW}>
            <span>Район:</span>
            <b>{r.districts.join(" / ")}</b>
          </div>
          <div className={PARAMETER_ROW}>
            <span>Площадь:</span>
            <b>
              {r.areaMin}–{r.areaMax} м²
            </b>
          </div>
        </div>
        <div className={REQUEST_BOX}>
          <small>Пожелания клиента</small>
          <p className="line-clamp-3 text-[12px] leading-[1.5] text-ink-soft">
            {r.goal}. {r.notes}
          </p>
        </div>
      </Button>
      <div className="mt-12 flex flex-wrap gap-6">
        {links.map((link, i) => (
          <Button
            key={link.label}
            className={cn(REQUEST_LINK, i === links.length - 1 && REQUEST_LINK_LAST)}
            onClick={link.open}
          >
            {link.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
