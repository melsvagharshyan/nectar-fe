import {
  DISTRICT_MAP,
  DISTRICT_SHAPES,
  SMALL_LABEL_DISTRICT,
} from "./constants";

export function DistrictScheme({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (district: string) => void;
}) {
  return (
    <svg
      className={DISTRICT_MAP}
      viewBox="0 0 470 310"
      role="img"
      aria-label="Схема районов, границы приблизительные"
    >
      {DISTRICT_SHAPES.map(({ name, points, labelX, labelY }) => (
        <g key={name}>
          <polygon
            points={points}
            className={
              selected.includes(name)
                ? "fill-accent stroke-accent-hover"
                : "fill-fill stroke-line-strong hover:fill-accent-tint"
            }
            strokeWidth="2"
            role="button"
            tabIndex={0}
            aria-label={name}
            aria-pressed={selected.includes(name)}
            onClick={() => onToggle(name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggle(name);
              }
            }}
          />
          <text
            className={selected.includes(name) ? "fill-white" : "fill-ink-soft"}
            x={labelX}
            y={labelY}
            textAnchor="middle"
            fontSize={name === SMALL_LABEL_DISTRICT ? 9 : 11}
          >
            {name}
          </text>
        </g>
      ))}
    </svg>
  );
}
