import { Button, Icon, Tabs } from "../../../components/ui";
import { cn } from "../../../utils/helpers";
import type { PartnerWorkspaceModel } from "../utils/hooks";
import { EYEBROW, HEAD, HEADING_BUTTON } from "../utils/styles";

type MatchingTab = "all" | "matching";

const VIEW_ACTIVE = "bg-surface text-ink shadow-card hover:not-disabled:bg-surface";

export function PropertyBaseHeader({
  model: m,
}: {
  model: PartnerWorkspaceModel;
}) {
  return (
    <div className="border-b border-line pb-14">
      <div className={cn(HEAD, "border-b-0 pb-10")}>
        <h2 className={EYEBROW}>База объектов · Ереван</h2>
        <div className="flex gap-2 rounded-[10px] bg-fill p-3">
          <Button
            variant="ghost"
            iconOnly
            className={cn(HEADING_BUTTON, m.view === "grid" && VIEW_ACTIVE)}
            aria-label="Карточки объектов"
            aria-pressed={m.view === "grid"}
            onClick={() => m.setView("grid")}
          >
            <Icon name="grid" className="size-16" />
          </Button>
          <Button
            variant="ghost"
            iconOnly
            className={cn(HEADING_BUTTON, m.view === "list" && VIEW_ACTIVE)}
            aria-label="Список объектов"
            aria-pressed={m.view === "list"}
            onClick={() => m.setView("list")}
          >
            <Icon name="list" className="size-16" />
          </Button>
        </div>
      </div>
      <Tabs<MatchingTab>
        items={[
          { id: "all", label: "Все доступные" },
          { id: "matching", label: "Подходящие" },
        ]}
        value={m.matching ? "matching" : "all"}
        onChange={(id) => m.setMatching(id === "matching")}
        classNames={{ root: "gap-6 px-16" }}
      />
    </div>
  );
}
