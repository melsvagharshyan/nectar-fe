import { Controller, type Control } from "react-hook-form";
import type { Role } from "../../../demo/types";
import { Button, Icon, Search } from "../../../components/ui";
import { CATALOG_SEARCH_LABELS } from "../utils/constants";
import type { CatalogFilters, CatalogView } from "../utils/types";
import {
  CATALOG_TOOLBAR,
  FILTER_TOGGLE,
  TOOLBAR_SPACER,
  VIEW_BUTTON,
  VIEW_BUTTON_ACTIVE,
  VIEW_TOGGLE,
} from "../utils/styles";
import { TOOLBAR } from "../../../utils/styles";
import { cn } from "../../../utils/helpers";

export function CatalogToolbar({
  role,
  control,
  view,
  filtersOpen,
  onViewChange,
  onToggleFilters,
}: {
  role: Role;
  control: Control<CatalogFilters>;
  view: CatalogView;
  filtersOpen: boolean;
  onViewChange: (view: CatalogView) => void;
  onToggleFilters: () => void;
}) {
  const viewButton = (mode: CatalogView) =>
    cn(VIEW_BUTTON, view === mode && VIEW_BUTTON_ACTIVE);

  return (
    <div className={cn(TOOLBAR, CATALOG_TOOLBAR)}>
      <Controller
        control={control}
        name="search"
        render={({ field }) => (
          <Search
            {...field}
            label={CATALOG_SEARCH_LABELS[role]}
          />
        )}
      />
      <span className={TOOLBAR_SPACER} />
      <Button
        selected={filtersOpen}
        aria-expanded={filtersOpen}
        className={FILTER_TOGGLE}
        onClick={onToggleFilters}
      >
        <Icon name="filter" className="size-15" />
        Фильтры
      </Button>
      <div className={VIEW_TOGGLE}>
        <Button
          variant="ghost"
          iconOnly
          aria-pressed={view === "table"}
          className={viewButton("table")}
          aria-label="Режим таблицы"
          onClick={() => onViewChange("table")}
        >
          <Icon name="list" className="size-16" />
        </Button>
        <Button
          variant="ghost"
          iconOnly
          aria-pressed={view === "grid"}
          className={viewButton("grid")}
          aria-label="Режим плитки"
          onClick={() => onViewChange("grid")}
        >
          <Icon name="grid" className="size-16" />
        </Button>
      </div>
    </div>
  );
}
