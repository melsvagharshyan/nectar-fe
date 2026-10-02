import { Radio } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { segmentLabel } from "../utils/helpers";
import type { PropertyFormValues, PropertyTextField } from "../utils/types";
import { FIELD } from "../../../utils/styles";
import { SEGMENTS, SEGMENTS_LABEL, SEGMENTS_WRAP } from "../utils/styles";
import { cn } from "../../../utils/helpers";

export function SegmentedField({
  name,
  label,
  options,
  disabled,
}: {
  name: PropertyTextField;
  label: string;
  options: string[];
  disabled?: boolean;
}) {
  const { control } = useFormContext<PropertyFormValues>();
  const labelId = `editor-${name}-label`;
  const errorId = `editor-${name}-error`;
  const wrap =
    name === "type" || name === "rooms" ? SEGMENTS_WRAP[name] : undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;
        return (
          <div className={FIELD}>
            <span id={labelId} className={SEGMENTS_LABEL}>
              {label}
            </span>
            <div
              role="radiogroup"
              aria-labelledby={labelId}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
            >
              <Radio.Group
                className={cn(SEGMENTS, wrap)}
                name={name}
                optionType="button"
                buttonStyle="solid"
                value={field.value}
                disabled={disabled}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                options={options.map((option) => ({
                  value: option,
                  label: segmentLabel(name, option),
                }))}
              />
            </div>
            {error && (
              <small id={errorId} role="alert">
                {error}
              </small>
            )}
          </div>
        );
      }}
    />
  );
}
