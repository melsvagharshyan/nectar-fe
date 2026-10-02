import { Controller } from "react-hook-form";
import { panel } from "../../app/router";
import { PageHead } from "../../components/PageHead";
import { Badge, Button, Empty, Search, Tabs } from "../../components/ui";
import { CompanyCard } from "./components/CompanyCard";
import { companyStats } from "./utils/helpers";
import { useCompanies } from "./utils/hooks";
import { PAGE, TOOLBAR, TWO_COL } from "../../utils/styles";

export function Companies() {
  const { state, kind, setKind, tabs, searchControl, companies } =
    useCompanies();
  return (
    <div className={PAGE}>
      <PageHead
        title="Компании"
        subtitle="Агентства и партнёры на платформе"
      >
        <Button variant="primary" onClick={() => panel("company-form")}>
          Добавить компанию
        </Button>
      </PageHead>
      <Tabs items={tabs} value={kind} onChange={setKind} />
      <div className={TOOLBAR}>
        <Controller
          name="search"
          control={searchControl}
          render={({ field }) => (
            <Search {...field} label="Название или ID компании" />
          )}
        />
        <Badge value="Активные" />
      </div>
      <div className={TWO_COL}>
        {companies.map((c) => (
          <CompanyCard key={c.id} company={c} stats={companyStats(state, c)} />
        ))}
      </div>
      {!companies.length && <Empty text="Компании не найдены" />}
    </div>
  );
}
