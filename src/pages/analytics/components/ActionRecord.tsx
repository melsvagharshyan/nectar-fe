import { Button } from "../../../components/ui";
import { RECORD } from "../../../utils/styles";

export function ActionRecord({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className={RECORD}>
      <div>
        <strong>{title}</strong>
        <p className="text-muted">{description}</p>
      </div>
      <Button onClick={onAction}>{actionLabel}</Button>
    </div>
  );
}
