import { Button } from "./ui";

export function MobileSteps({
  steps,
  value,
  onChange,
}: {
  steps: string[];
  value: number;
  onChange: (step: number) => void;
}) {
  return (
    <div className="hidden gap-4 border-b border-line bg-surface px-12 py-8 max-lg:flex">
      {steps.map((step, i) => (
        <Button
          key={step}
          variant="tab"
          className="flex-1 rounded-[10px] py-8 text-[12px]"
          active={value === i}
          aria-pressed={value === i}
          onClick={() => onChange(i)}
        >
          {i + 1}. {step}
        </Button>
      ))}
    </div>
  );
}
