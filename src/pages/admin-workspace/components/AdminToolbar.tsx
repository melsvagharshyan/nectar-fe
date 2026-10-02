import { Controller, type Control } from "react-hook-form";
import { Select } from "../../../components/form";
import { Button, Search } from "../../../components/ui";
import type { DemoState } from "../../../demo/types";
import type { AdminFilters } from "../utils/types";
import { TOOLBAR } from "../../../utils/styles";

export function AdminToolbar({
  control,
  companies,
}: {
  control: Control<AdminFilters>;
  companies: DemoState["companies"];
}) {
  const optionsOf = (kind: "rf" | "am") =>
    companies
      .filter((c) => c.kind === kind)
      .map((c) => ({ value: c.id, label: c.name }));
  return (
    <div className={TOOLBAR}>
      <Controller
        name="search"
        control={control}
        render={({ field }) => <Search {...field} label="Поиск запроса" />}
      />
      <Controller
        name="company"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            aria-label="Российская компания"
            placeholder="Все российские компании"
            options={optionsOf("rf")}
          />
        )}
      />
      <Controller
        name="partner"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            aria-label="Армянская компания"
            placeholder="Все армянские компании"
            options={optionsOf("am")}
          />
        )}
      />
      <Controller
        name="attention"
        control={control}
        render={({ field }) => (
          <Button
            selected={field.value}
            onClick={() => field.onChange(!field.value)}
          >
            Требует внимания
          </Button>
        )}
      />
    </div>
  );
}
