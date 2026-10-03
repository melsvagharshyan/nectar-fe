import { Badge } from "../../../components/ui";
import type { RequestStage } from "../../../demo/types";
import { ANALYTICS_STAGES } from "../utils/constants";
import { crmShare } from "../utils/helpers";
import type { Metrics } from "../utils/types";
import { BOX, RECORD } from "../../../utils/styles";

export function StageBreakdown({
  stages,
  metrics: m,
}: {
  stages: Partial<Record<RequestStage, number>>;
  metrics: Metrics;
}) {
  return (
    <div className={BOX}>
      <h2>Стадии запросов</h2>
      {ANALYTICS_STAGES.map((stage) => (
        <div className={RECORD} key={stage}>
          <Badge value={stage} />
          <strong>{stages[stage] ?? 0}</strong>
        </div>
      ))}
      <p className="text-muted mt-20">
        Дошли до CRM: {m.reachedCrm} из {m.requests} запросов, {crmShare(m)}
        %.
      </p>
    </div>
  );
}
