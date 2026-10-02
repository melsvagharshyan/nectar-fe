import { sortedDistricts } from "../utils/helpers";
import { BOX } from "../../../utils/styles";

export function DistrictsChart({
  districts,
}: {
  districts: Record<string, number>;
}) {
  const max = Math.max(...Object.values(districts));
  return (
    <div className={BOX}>
      <h2>Популярные районы</h2>
      <small>Запрос с несколькими районами учитывается в каждой строке</small>
      {sortedDistricts(districts).map(([district, count]) => (
        <div
          className="my-16 grid grid-cols-[140px_1fr_25px] items-center gap-12 text-[13px] max-xs:grid-cols-[115px_1fr_20px] max-xs:text-[12px]"
          key={district}
        >
          <span>{district}</span>
          <div className="h-8 overflow-hidden rounded-full bg-fill">
            <i
              className="block h-full rounded-full bg-accent"
              style={{ width: `${(count / max) * 100}%` }}
            />
          </div>
          <b>{count}</b>
        </div>
      ))}
    </div>
  );
}
