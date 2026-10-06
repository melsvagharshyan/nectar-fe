import type { Role } from "../../demo/types";
import { Button, Empty, Icon, InfiniteList, Tabs } from "../../components/ui";
import { openPropertyEditor } from "../../utils/navigation";
import { CatalogFilterPanel } from "./components/CatalogFilterPanel";
import { CatalogGrid } from "./components/CatalogGrid";
import { CatalogTable } from "./components/CatalogTable";
import { CatalogToolbar } from "./components/CatalogToolbar";
import { CATALOG_STATUS_TABS, CATALOG_TITLES } from "./utils/constants";
import { useCatalog } from "./utils/hooks";
import {
  CATALOG_HEAD,
  CATALOG_LAYOUT,
  CATALOG_MAIN,
  CATALOG_PAGE,
  CATALOG_SUMMARY,
  CATALOG_TITLE,
  STATUS_TABS,
} from "./utils/styles";
import { PAGE } from "../../utils/styles";
import { cn } from "../../utils/helpers";

export function Catalog({ role }: { role: Role }) {
  const catalog = useCatalog(role);
  const { properties } = catalog;

  return (
    <div className={cn(PAGE, CATALOG_PAGE)}>
      <div className={CATALOG_HEAD}>
        <div>
          <h1 className={CATALOG_TITLE}>{CATALOG_TITLES[role]}</h1>
          <p className={CATALOG_SUMMARY}>
            Показано объектов: <b>{catalog.total}</b> из {catalog.overall}
          </p>
        </div>
        {role === "partner" && (
          <Button variant="primary" onClick={() => openPropertyEditor(role)}>
            <Icon name="plus" className="size-15" />
            Добавить объект
          </Button>
        )}
      </div>
      <div className={CATALOG_LAYOUT}>
        <CatalogFilterPanel
          control={catalog.control}
          districts={catalog.districts}
          companies={catalog.partnerCompanies}
          showCompany={role === "admin"}
          className={catalog.showFilters ? undefined : "max-lg:hidden"}
          onReset={catalog.reset}
        />
        <div className={CATALOG_MAIN}>
          {role !== "broker" && (
            <Tabs
              items={CATALOG_STATUS_TABS.map((tab) => ({
                ...tab,
                count: tab.id ? (catalog.statusCounts[tab.id] ?? 0) : catalog.overall,
              }))}
              value={catalog.status}
              onChange={catalog.setStatus}
              classNames={STATUS_TABS}
            />
          )}
          <CatalogToolbar
            role={role}
            control={catalog.control}
            view={catalog.view}
            filtersOpen={catalog.showFilters}
            onViewChange={catalog.setView}
            onToggleFilters={catalog.toggleFilters}
          />
          {!properties.length && !catalog.loading ? (
            <Empty
              text={
                role === "broker"
                  ? "Здесь появятся объекты из одобренных предложений по вашим запросам"
                  : "Объекты не найдены"
              }
            >
              <Button onClick={catalog.reset}>Сбросить фильтры</Button>
            </Empty>
          ) : catalog.view === "grid" ? (
            <InfiniteList
              hasMore={catalog.feed.hasMore}
              loading={catalog.loading || catalog.feed.loading}
              onLoadMore={catalog.feed.loadMore}
            >
              <CatalogGrid role={role} properties={properties} />
            </InfiniteList>
          ) : (
            <CatalogTable
              state={catalog.state}
              role={role}
              properties={properties}
              offers={catalog.offers}
              paging={catalog.paging}
              loading={catalog.loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
