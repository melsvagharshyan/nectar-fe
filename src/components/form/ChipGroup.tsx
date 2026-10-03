import { Checkbox } from "antd";
import { cn } from "../../utils/helpers";
import { FIELD } from "../../utils/styles";

const OPTION_TILES =
  "grid auto-rows-fr grid-cols-3 gap-8 leading-[1.3] max-md:grid-cols-2 max-xs:grid-cols-1 [&_.ant-checkbox-wrapper]:m-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper]:items-center [&_.ant-checkbox-wrapper]:gap-2 [&_.ant-checkbox-wrapper]:rounded-[10px] [&_.ant-checkbox-wrapper]:border [&_.ant-checkbox-wrapper]:border-line [&_.ant-checkbox-wrapper]:bg-surface [&_.ant-checkbox-wrapper]:px-12 [&_.ant-checkbox-wrapper]:py-10 [&_.ant-checkbox-wrapper]:text-[13px] [&_.ant-checkbox-wrapper]:transition-colors [&_.ant-checkbox-wrapper:hover]:border-accent-edge [&_.ant-checkbox-wrapper-checked]:border-accent [&_.ant-checkbox-wrapper-checked]:bg-accent-tint [&_.ant-checkbox-wrapper-checked]:font-medium";

export function ChipGroup({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}) {
  return (
    <div className={cn(FIELD, "gap-10", className)} role="group" aria-label={label}>
      <span>{label}</span>
      <Checkbox.Group className={OPTION_TILES} options={options} value={value} onChange={onChange} />
    </div>
  );
}
