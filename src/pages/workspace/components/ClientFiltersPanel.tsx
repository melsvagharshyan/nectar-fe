import { Controller, type Control } from "react-hook-form";
import { Select } from "../../../components/form";
import { STAGE_FILTER_OPTIONS } from "../utils/constants";
import type { BrokerData, ClientFilters } from "../utils/types";

export function ClientFiltersPanel({
  control,
  employees,
}: {
  control: Control<ClientFilters>;
  employees: BrokerData["employees"];
}) {
  return (
    <>
      <Controller
        name="manager"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            aria-label="Менеджер"
            placeholder="Все менеджеры"
            options={employees.map((e) => ({ value: e.id, label: e.name }))}
          />
        )}
      />
      <Controller
        name="stage"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            aria-label="Стадия запроса"
            placeholder="Все стадии"
            options={STAGE_FILTER_OPTIONS}
          />
        )}
      />
    </>
  );
}
