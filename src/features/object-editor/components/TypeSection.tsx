import { EDITOR_MARKET_OPTIONS, EDITOR_TYPE_OPTIONS } from "../utils/constants";
import { SECTION, SECTION_TITLE } from "../utils/styles";
import { SegmentedField } from "./SegmentedField";

export function TypeSection({ readonly }: { readonly: boolean }) {
  return (
    <section className={SECTION}>
      <h2 className={SECTION_TITLE}>Тип и категория</h2>
      <SegmentedField
        name="type"
        label="Тип недвижимости *"
        options={EDITOR_TYPE_OPTIONS}
        disabled={readonly}
      />
      <SegmentedField
        name="market"
        label="Рынок"
        options={EDITOR_MARKET_OPTIONS}
        disabled={readonly}
      />
    </section>
  );
}
