import { panel } from "../../../app/router";
import type { Company } from "../../../demo/types";
import { Badge, Button, InfiniteList } from "../../../components/ui";
import { useCompanyRecords } from "../utils/hooks";
import { RECORD } from "../../../utils/styles";

export function CompanyRecords({ company }: { company: Company }) {
  const records = useCompanyRecords(company);
  return (
    <InfiniteList
      hasMore={records.hasMore}
      loading={records.loading}
      onLoadMore={records.loadMore}
    >
      {records.clients.map((c) => (
        <div className={RECORD} key={c.id}>
          <span>{c.name}</span>
          <small>{records.requestCount(c.id)} запросов</small>
        </div>
      ))}
      {records.properties.map((p) => (
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
    </InfiniteList>
  );
}
