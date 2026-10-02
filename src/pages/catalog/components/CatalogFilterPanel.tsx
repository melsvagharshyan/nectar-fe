import { Radio } from "antd";
import { Controller, type Control } from "react-hook-form";
import type { Company } from "../../../demo/types";
import { FormField, Input, Select } from "../../../components/form";
import { Button } from "../../../components/ui";
import { cn } from "../../../utils/helpers";
import { CATALOG_ROOM_OPTIONS } from "../utils/constants";
import type { CatalogFilters } from "../utils/types";
import {
  FILTER_GROUP,
  FILTER_HEAD,
  FILTER_PANEL,
  ROOM_CHIPS,
} from "../utils/styles";

export function CatalogFilterPanel({
  control,
  districts,
  companies,
  showCompany,
  className,
  onReset,
}: {
  control: Control<CatalogFilters>;
  districts: string[];
  companies: Company[];
  showCompany: boolean;
  className?: string;
  onReset: () => void;
}) {
  return (
    <aside className={cn(FILTER_PANEL, className)} aria-label="Фильтры объектов">
      <div className={FILTER_HEAD}>
        <h2 className="text-[16px]">Фильтры</h2>
        <Button variant="link" className="text-[12px] font-semibold" onClick={onReset}>
          Сбросить фильтры
        </Button>
      </div>
      <Controller
        control={control}
        name="district"
        render={({ field }) => (
          <FormField id="catalog-district" label="Район" className={FILTER_GROUP}>
            <Select {...field} id="catalog-district" options={districts} placeholder="Все районы" />
          </FormField>
        )}
      />
      <Controller
        control={control}
        name="price"
        render={({ field }) => (
          <FormField id="catalog-price" label="Цена до ($)" className={FILTER_GROUP}>
            <Input {...field} id="catalog-price" type="number" min="0" placeholder="Без ограничений" />
          </FormField>
        )}
      />
      <Controller
        control={control}
        name="area"
        render={({ field }) => (
          <FormField id="catalog-area" label="Площадь от (м²)" className={FILTER_GROUP}>
            <Input {...field} id="catalog-area" type="number" min="0" placeholder="0" />
          </FormField>
        )}
      />
      <div className={FILTER_GROUP}>
        <span id="catalog-rooms">Комнаты</span>
        <Controller
          control={control}
          name="rooms"
          render={({ field }) => (
            <Radio.Group
              aria-labelledby="catalog-rooms"
              className={ROOM_CHIPS}
              optionType="button"
              buttonStyle="solid"
              name={field.name}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              options={CATALOG_ROOM_OPTIONS}
            />
          )}
        />
      </div>
      {showCompany && (
        <Controller
          control={control}
          name="company"
          render={({ field }) => (
            <FormField id="catalog-company" label="Компания" className={FILTER_GROUP}>
              <Select
                {...field}
                id="catalog-company"
                options={companies.map((c) => ({ value: c.id, label: c.name }))}
                placeholder="Все компании"
              />
            </FormField>
          )}
        />
      )}
    </aside>
  );
}
