import { navigate } from "../../../app/router";
import { Button } from "../../../components/ui";
import type { Role } from "../../../demo/types";
import { metricTarget } from "../utils/helpers";
import type { MetricCard } from "../utils/types";

export function MetricCards({
  role,
  cards,
}: {
  role: Role;
  cards: MetricCard[];
}) {
  return (
    <div className="mb-24 grid grid-cols-5 gap-12 max-lg:grid-cols-2 lg:max-xl:grid-cols-3">
      {cards.map(({ name, value, view }) => {
        const target = metricTarget(role, view);
        return (
          <Button
            key={name}
            className="flex-col items-start rounded-[16px] border-line bg-surface p-20 text-left shadow-card hover:not-disabled:border-accent-edge hover:not-disabled:bg-surface max-xs:p-14 [&_span]:text-[12px] [&_span]:font-medium [&_span]:text-muted [&_strong]:my-8 [&_strong]:text-[30px] [&_strong]:font-bold [&_strong]:tracking-[-0.8px] [&_small]:font-semibold [&_small]:text-accent-text"
            onClick={() => navigate(target.path, target.params)}
          >
            <span>{name}</span>
            <strong>{value}</strong>
            <small>Открыть →</small>
          </Button>
        );
      })}
    </div>
  );
}
