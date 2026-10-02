import type { Ref } from "react";
import { Input } from "antd";
import type { TextAreaProps, TextAreaRef } from "antd/es/input/TextArea";

export function TextArea({
  invalid,
  ...props
}: TextAreaProps & { ref?: Ref<TextAreaRef>; invalid?: boolean }) {
  return (
    <Input.TextArea
      autoSize={{ minRows: 3, maxRows: 8 }}
      status={invalid ? "error" : undefined}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
