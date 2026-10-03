import { panel } from "../../../app/router";
import { PropertyCard } from "../../../components/property-card";
import { Button, Empty } from "../../../components/ui";
import { cn } from "../../../utils/helpers";
import { COLUMN, COLUMN_VISIBLE, SCROLL, STACK } from "../../../utils/styles";
import type { PartnerWorkspaceModel } from "../utils/hooks";
import { COLUMN_FRAME } from "../utils/styles";
import { DraftToggleButton } from "./DraftToggleButton";
import { PropertyBaseHeader } from "./PropertyBaseHeader";
import { PropertyListRow } from "./PropertyListRow";

const CATALOG_GRID =
  "partner-catalog grid auto-rows-max content-start gap-16 p-16 grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))]";

export function PropertyBaseColumn({
  model: m,
}: {
  model: PartnerWorkspaceModel;
}) {
  const grid = m.view === "grid";
  return (
    <section
      className={cn(
        "offers-column",
        COLUMN,
        m.step === 2 && COLUMN_VISIBLE,
        COLUMN_FRAME,
      )}
    >
      <PropertyBaseHeader model={m} />
      <div className={cn(SCROLL, grid ? CATALOG_GRID : cn(STACK, "p-16"))}>
        {m.properties.map((p) => {
          const offered = m.isOffered(p.id);
          const open = () => panel("property", { object: p.id });
          const action = (
            <DraftToggleButton
              selected={m.draft.includes(p.id)}
              offered={offered}
              disabled={m.locked || offered}
              onToggle={() => m.toggleDraft(p.id)}
            />
          );
          return grid ? (
            <PropertyCard
              key={p.id}
              variant="compact"
              context="partner"
              property={p}
              onOpen={open}
              actions={action}
            />
          ) : (
            <PropertyListRow
              key={p.id}
              property={p}
              action={action}
              onOpen={open}
            />
          );
        })}
        {!m.properties.length && (
          <Empty text="В вашей базе нет подходящих объектов">
            <Button onClick={() => m.setMatching(false)}>
              Показать все доступные
            </Button>
          </Empty>
        )}
      </div>
    </section>
  );
}
