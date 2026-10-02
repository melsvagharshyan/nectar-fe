import type { Ref } from "react";
import { Input as AntInput, type InputRef } from "antd";
import type { PasswordProps } from "antd/es/input";

export function PasswordInput({
  invalid,
  ...props
}: PasswordProps & { ref?: Ref<InputRef>; invalid?: boolean }) {
  return (
    <AntInput.Password
      status={invalid ? "error" : undefined}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
