import { panel } from "../../../app/router";
import { Button, Icon } from "../../../components/ui";
import type { Request } from "../../../demo/types";
import type { WorkspaceModel } from "../utils/hooks";
import { ACTION_BAR } from "../utils/styles";

export function OffersActionBar({
  model: m,
  request,
  admin,
}: {
  model: WorkspaceModel;
  request: Request;
  admin: boolean;
}) {
  const { transfer, selected } = m;
  const openTransfer = () =>
    panel("transfer", { request: request.id, client: request.clientId });
  return (
    <div className={ACTION_BAR}>
      <div className="flex min-w-0 items-center gap-12">
        <span className="flex size-40 shrink-0 items-center justify-center rounded-[12px] bg-accent-tint text-[15px] font-bold text-accent-text max-xs:hidden">
          {selected.length}
        </span>
        <div className="min-w-0">
          <strong className="text-[14px]">
            {request.stage === "sold"
              ? "Запрос завершён"
              : `Выбрано: ${selected.length}`}
          </strong>
          <small className="mt-2 block max-xs:text-[11px]">
            {transfer
              ? "Выбор зафиксирован. Изменение доступно после возврата."
              : selected.length
                ? "Готово к следующему шагу"
                : "Отметьте интересные объекты"}
          </small>
        </div>
      </div>
      {admin ? (
        <Button disabled={!transfer} onClick={openTransfer}>
          Посмотреть передачу
        </Button>
      ) : (
        <Button
          variant="primary"
          className="shrink-0 px-18 py-10 max-xs:px-12 max-xs:text-[12px]"
          disabled={request.stage === "sold" || (!transfer && !selected.length)}
          onClick={openTransfer}
        >
          {transfer ? "Посмотреть передачу" : "Передать в CRM"}
          <Icon name="arrow" className="size-15" />
        </Button>
      )}
    </div>
  );
}
