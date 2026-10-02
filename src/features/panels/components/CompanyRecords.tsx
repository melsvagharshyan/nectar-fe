import { panel } from "../../../app/router";
import type { Company, DemoState } from "../../../demo/types";
import { Badge, Button } from "../../../components/ui";
import { RECORD } from "../../../utils/styles";

export function CompanyRecords({
  state,
  company,
}: {
  state: DemoState;
  company: Company;
}) {
  if (company.kind === "rf")
    return (
      <>
        {state.clients
          .filter((c) => c.companyId === company.id)
          .map((c) => (
            <div className={RECORD} key={c.id}>
              <span>{c.name}</span>
              <small>
                {state.requests.filter((r) => r.clientId === c.id).length}{" "}
                запросов
              </small>
            </div>
          ))}
      </>
    );
  return (
    <>
      {state.properties
        .filter((p) => p.companyId === company.id)
        .map((p) => (
          <div className={RECORD} key={p.id}>
            <Button
              variant="link"
              onClick={() => panel("property", { object: p.id })}
            >
              {p.id} · {p.district}
            </Button>
            <Badge value={p.availability} />
          </div>
        ))}
    </>
  );
}
