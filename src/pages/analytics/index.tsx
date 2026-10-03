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
  const a = useAnalytics(role);
  return (
    <div className={PAGE}>
      <PageHead
        title={overview ? "Обзор платформы" : "Аналитика"}
        subtitle="Данные платформы за всё время"
      />
      <MetricCards role={role} cards={a.cards} />
      {overview ? (
        <OverviewSection
          role={role}
          transfers={a.transfers}
          attention={a.attention}
          attentionCount={a.metrics.attention}
        />
      ) : (
        <div className={TWO_COL}>
          <DistrictsChart districts={a.districts} />
          <StageBreakdown stages={a.stages} metrics={a.metrics} />
          {role === "admin" && <CompanyActivity companies={a.companies} />}
        </div>
      )}
    </div>
  );
}
