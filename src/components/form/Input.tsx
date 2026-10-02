import type { Ref } from "react";
import { Input as AntInput, type InputProps, type InputRef } from "antd";

export function Input({
  invalid,
  ...props
}: InputProps & { ref?: Ref<InputRef>; invalid?: boolean }) {
  return (
    <AntInput
      status={invalid ? "error" : undefined}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
