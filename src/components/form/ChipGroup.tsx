import { Checkbox } from "antd";
import { FIELD } from "../../utils/styles";

export function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <div className={FIELD} role="group" aria-label={label}>
      <span>{label}</span>
      <Checkbox.Group
        className="flex flex-wrap gap-x-4 gap-y-8"
        options={options}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
