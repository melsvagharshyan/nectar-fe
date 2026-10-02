import { panel } from "../../../app/router";
import { Avatar, Button } from "../../../components/ui";
import type { Company, CompanyStat } from "../utils/types";
import { BOX, RECORD, ROW } from "../../../utils/styles";

export function CompanyCard({
  company: c,
  stats,
}: {
  company: Company;
  stats: CompanyStat[];
}) {
  return (
    <div className={BOX}>
      <div className={ROW}>
        <Avatar name={c.name} />
        <div>
          <h2 style={{ margin: 0 }}>{c.name}</h2>
          <small>
            {c.id} · {c.contact}
          </small>
        </div>
      </div>
      {stats.map((stat) => (
        <div className={RECORD} key={stat.label}>
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
        </div>
      ))}
      <Button
        variant="secondary"
        className="mt-20"
        onClick={() => panel("company", { company: c.id })}
      >
        Карточка компании →
      </Button>
    </div>
  );
}
