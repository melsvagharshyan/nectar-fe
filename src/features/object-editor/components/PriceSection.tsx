import { useFormContext } from "react-hook-form";
import { ControlledField } from "../../../components/form";
import { cn, money } from "../../../utils/helpers";
import { FORM_GRID } from "../../../utils/styles";
import {
  CALCULATED,
  CALCULATED_VALUE,
  PRICE_GRID,
  SECTION,
  SECTION_TITLE,
} from "../utils/styles";
import type { PropertyFormValues } from "../utils/types";

export function PriceSection({ price, area }: { price: number; area: number }) {
  const { control } = useFormContext<PropertyFormValues>();
  return (
    <section className={SECTION}>
      <h2 className={SECTION_TITLE}>Стоимость и площадь</h2>
      <div className={cn(FORM_GRID, PRICE_GRID)}>
        <ControlledField control={control} name="price" label="Цена ($)" type="number" />
        <ControlledField control={control} name="area" label="Площадь (м²)" type="number" />
        <div className={CALCULATED}>
          Цена за м²
          <span className={CALCULATED_VALUE}>
            {area > 0 ? money(price / area) : "—"}
          </span>
        </div>
      </div>
    </section>
  );
}
