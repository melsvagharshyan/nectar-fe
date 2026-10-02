import { Controller, type Control } from "react-hook-form";
import { Input, Select } from "../../../components/form";
import { ROOM_FILTER_OPTIONS } from "../../../utils/constants";
import { OFFER_SORT_OPTIONS } from "../utils/constants";
import type { OfferFilters } from "../utils/types";

const FILTER_SELECT = "w-170 max-w-full";

export function OfferFiltersPanel({
  control,
  districts,
}: {
  control: Control<OfferFilters>;
  districts: string[];
}) {
  return (
    <div className="flex flex-wrap items-end gap-9 rounded-[12px] border border-line bg-subtle p-12">
      <Controller
        name="district"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            className={FILTER_SELECT}
            aria-label="Район предложений"
            placeholder="Все районы"
            options={districts}
          />
        )}
      />
      <Controller
        name="budget"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            className="w-140 max-w-full"
            aria-label="Максимальная цена предложения"
            placeholder="Цена до, USD"
            type="number"
            min="0"
          />
        )}
      />
      <Controller
        name="rooms"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            className={FILTER_SELECT}
            aria-label="Комнаты предложения"
            placeholder="Все комнаты"
            options={ROOM_FILTER_OPTIONS}
          />
        )}
      />
      <Controller
        name="sort"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            className={FILTER_SELECT}
            aria-label="Сортировка предложений"
            options={OFFER_SORT_OPTIONS}
          />
        )}
      />
    </div>
  );
}
