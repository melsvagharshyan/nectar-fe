import { panel } from "../../../app/router";
import { Button, Count, Empty, Icon } from "../../../components/ui";
import { cn } from "../../../utils/helpers";
import { COLUMN, COLUMN_VISIBLE, SCROLL } from "../../../utils/styles";
import type { PartnerWorkspaceModel } from "../utils/hooks";
import { COLUMN_FRAME, EYEBROW, HEAD, PRIMARY } from "../utils/styles";
import { SelectionCriteria } from "./SelectionCriteria";
import { SelectionItem } from "./SelectionItem";

const DROP_ZONE =
  "min-h-90 flex-[0] rounded-[14px] border-2 border-dashed border-line-strong bg-subtle px-15 py-20 text-[12px]";

export function SelectionColumn({ model: m }: { model: PartnerWorkspaceModel }) {
  const { request, draft, locked } = m;
  return (
    <section className={cn(COLUMN, m.step === 1 && COLUMN_VISIBLE, COLUMN_FRAME)}>
      <div className={HEAD}>
        <h2 className={EYEBROW}>
          Подборка по запросу
          <span className="font-code text-[13px] font-medium text-faint">{request?.id}</span>
        </h2>
        <Count>{draft.length}</Count>
      </div>
      <div className={cn(SCROLL, "flex flex-col gap-12 bg-subtle p-14")}>
        {request ? (
          <>
            <SelectionCriteria request={request} />
            {draft.map((id) => (
              <SelectionItem
                key={id}
                property={m.data.properties.find((p) => p.id === id)!}
                onRemove={() => m.toggleDraft(id)}
              />
            ))}
            {!draft.length && (
              <Empty text="Добавьте объекты из своей базы" className={DROP_ZONE} />
            )}
          </>
        ) : (
          <Empty text="Выберите запрос" className={DROP_ZONE} />
        )}
      </div>
      <div className="block shrink-0 border-t border-line bg-surface p-16">
        <Button
          variant="primary"
          className={cn("w-full py-10 max-xs:text-[12px]", PRIMARY)}
          disabled={locked || !draft.length}
          onClick={() => panel("send", { request: request?.id })}
        >
          <Icon name="arrow" className="size-15" />
          Отправить КП ({draft.length})
        </Button>
        <small className="mt-6 block text-center max-xs:text-[10px]">
          {locked
            ? "Запрос недоступен для новых предложений"
            : "Брокер увидит предложения после одобрения администратором"}
        </small>
      </div>
    </section>
  );
}
