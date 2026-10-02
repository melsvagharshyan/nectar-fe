import { PageHead } from "../../components/PageHead";
import type { Role } from "../../demo/types";
import { CompanyActivity } from "./components/CompanyActivity";
import { DistrictsChart } from "./components/DistrictsChart";
import { MetricCards } from "./components/MetricCards";
import { OverviewSection } from "./components/OverviewSection";
import { StageBreakdown } from "./components/StageBreakdown";
import { useAnalytics } from "./utils/hooks";
import { PAGE, TWO_COL } from "../../utils/styles";

export function Analytics({
  role,
  overview = false,
}: {
  role: Role;
  overview?: boolean;
}) {
  const { state, metrics, cards, districts, requests } = useAnalytics(role);
  return (
    <div className={PAGE}>
      <PageHead
        title={overview ? "Обзор платформы" : "Аналитика"}
        subtitle="Данные платформы за всё время"
      />
      <MetricCards role={role} cards={cards} />
      {overview ? (
        <OverviewSection
          state={state}
          role={role}
          attentionCount={metrics.attention}
        />
      ) : (
        <div className={TWO_COL}>
          <DistrictsChart districts={districts} />
          <StageBreakdown requests={requests} metrics={metrics} />
          {role === "admin" && <CompanyActivity state={state} />}
        </div>
      )}
    </div>
  );
}
