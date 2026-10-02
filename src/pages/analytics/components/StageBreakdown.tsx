import { Badge } from "../../../components/ui";
import type { Request } from "../../../demo/types";
import { ANALYTICS_STAGES } from "../utils/constants";
import { crmShare } from "../utils/helpers";
import type { Metrics } from "../utils/types";
import { BOX, RECORD } from "../../../utils/styles";

export function StageBreakdown({
  requests,
  metrics: m,
}: {
  requests: Request[];
  metrics: Metrics;
}) {
  return (
    <div className={BOX}>
      <h2>Стадии запросов</h2>
      {ANALYTICS_STAGES.map((stage) => (
        <div className={RECORD} key={stage}>
          <Badge value={stage} />
          <strong>{requests.filter((r) => r.stage === stage).length}</strong>
        </div>
      ))}
      <p className="text-muted mt-20">
        Дошли до CRM: {m.reachedCrm} из {m.requests} запросов, {crmShare(m)}
        %.
      </p>
    </div>
  );
}
