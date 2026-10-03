import { Controller, useFormContext } from "react-hook-form";
import { ChipGroup } from "../../../components/form";
import { Button, Icon } from "../../../components/ui";
import { DISTRICTS } from "../../../utils/constants";
import type { DemoFormValues } from "../utils/types";

export function RequestDistrictsField({ onOpenMap }: { onOpenMap: () => void }) {
  const { control } = useFormContext<DemoFormValues>();
  return (
    <Controller
      control={control}
      name="districts"
      render={({ field, fieldState }) => (
        <>
          <ChipGroup
            label="Районы *"
            options={DISTRICTS}
            value={field.value}
            onChange={field.onChange}
          />
          {fieldState.error && (
            <small role="alert">{fieldState.error.message}</small>
          )}
          <Button
            ref={field.ref}
            name="districts"
            aria-invalid={!!fieldState.error}
            onClick={onOpenMap}
          >
            <Icon name="pin" /> Выбрать на карте
          </Button>
        </>
      )}
    />
  );
}
