import { Controller } from "react-hook-form";
import { ChipGroup, ControlledField } from "../../../components/form";
import { Button } from "../../../components/ui";
import { FORM, FORM_GRID, NOTICE } from "../../../utils/styles";
import { KIT_DISTRICTS, PROPERTY_TYPE_OPTIONS } from "../utils/constants";
import { useKitForm } from "../utils/hooks";
import { KIT_GRID_2, KIT_PANEL } from "../utils/styles";

export function FormShowcase() {
  const { form, submitted, onSubmit, reset } = useKitForm();
  const { control, formState } = form;
  return (
    <div className={KIT_GRID_2}>
      <form className={FORM} noValidate onSubmit={onSubmit}>
        <div className={FORM_GRID}>
          <ControlledField control={control} name="name" label="Имя клиента *" />
          <ControlledField control={control} name="email" label="Email *" type="email" />
        </div>
        <div className={FORM_GRID}>
          <ControlledField
            control={control}
            name="type"
            label="Тип недвижимости *"
            options={[{ value: "", label: "Не выбран" }, ...PROPERTY_TYPE_OPTIONS]}
          />
          <ControlledField control={control} name="budget" label="Бюджет до, USD" type="number" />
        </div>
        <Controller
          control={control}
          name="districts"
          render={({ field, fieldState }) => (
            <div>
              <ChipGroup
                label="Районы *"
                options={KIT_DISTRICTS}
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error && (
                <small role="alert" className="mt-6 block text-danger">
                  {fieldState.error.message}
                </small>
              )}
            </div>
          )}
        />
        <ControlledField control={control} name="notes" label="Пожелания" type="textarea" />
        <div className="flex gap-10">
          <Button type="submit" variant="primary" disabled={formState.isSubmitting}>
            Проверить форму
          </Button>
          <Button onClick={reset}>Сбросить</Button>
        </div>
      </form>
      <div className={KIT_PANEL}>
        <h3 className="mb-8">Результат</h3>
        {submitted ? (
          <pre className="overflow-auto font-code text-[12px] text-ink-soft">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        ) : (
          <p className={NOTICE}>
            React Hook Form + Zod: ошибки появляются после отправки, значения
            проверяются схемой из <code className="font-code">validations.ts</code>.
          </p>
        )}
      </div>
    </div>
  );
}
