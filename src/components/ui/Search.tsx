import type { Ref } from "react";
import { Input, type InputRef } from "antd";
import { cn } from "../../utils/helpers";
import { Icon } from "./Icon";

export function Search({
  value,
  onChange,
  onBlur,
  label,
  name,
  ref,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  label: string;
  name?: string;
  ref?: Ref<InputRef>;
  className?: string;
}) {
  return (
    <Input
      ref={ref}
      name={name}
      aria-label={label}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      allowClear
      prefix={<Icon name="search" className="size-15 text-faint" />}
      className={cn("search min-w-0", className)}
    />
  );
}
