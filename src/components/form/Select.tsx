import type { Ref } from "react";
import { Select as AntSelect, type RefSelectProps, type SelectProps } from "antd";
import type { SelectOption } from "../../utils/types";
import { cn } from "../../utils/helpers";

const toOption = (item: string | SelectOption): SelectOption =>
  typeof item === "string" ? { value: item, label: item } : item;

export function Select({
  options,
  placeholder,
  value,
  onChange,
  invalid,
  className,
  ...props
}: Omit<SelectProps<string>, "options" | "onChange" | "value" | "placeholder"> & {
  options: (string | SelectOption)[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  invalid?: boolean;
  ref?: Ref<RefSelectProps>;
}) {
  const items = options.map(toOption);
  return (
    <AntSelect<string>
      className={cn("min-w-0", className)}
      value={value}
      onChange={(next) => onChange?.(next)}
      options={placeholder !== undefined ? [{ value: "", label: placeholder }, ...items] : items}
      status={invalid ? "error" : undefined}
      aria-invalid={invalid || undefined}
      popupMatchSelectWidth={false}
      {...props}
    />
  );
}
