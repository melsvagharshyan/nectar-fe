import { TYPE_SCALE } from "../utils/constants";

export function TypographyScale() {
  return (
    <div className="divide-y divide-line rounded-[16px] border border-line">
      {TYPE_SCALE.map((item) => (
        <div
          key={item.label}
          className="grid grid-cols-[200px_1fr] items-baseline gap-16 px-18 py-14 max-md:grid-cols-1 max-md:gap-4"
        >
          <span className="font-code text-[11px] text-faint">{item.label}</span>
          <span className={item.className}>Подходящие объекты для клиента</span>
        </div>
      ))}
    </div>
  );
}
