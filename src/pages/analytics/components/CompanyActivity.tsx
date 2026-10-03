import type { CompanyActivityItem } from "../../../api/analytics-api-ts/types";
import { BOX, RECORD } from "../../../utils/styles";

export function CompanyActivity({ companies }: { companies: CompanyActivityItem[] }) {
  return (
    <div className={BOX}>
      <h2>Активность компаний</h2>
      {companies.map((c) => (
        <div className={RECORD} key={c.id}>
          <span>{c.name}</span>
          <span>
            {c.count} {c.kind === "rf" ? "запросов" : "предложений"}
          </span>
        </div>
      ))}
    </div>
  );
}
