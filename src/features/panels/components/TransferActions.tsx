import type { Role } from "../../../demo/types";
import { Button } from "../../../components/ui";
import type { TransferConfirmMode } from "../utils/types";

export function TransferActions({
  role,
  hasTransfer,
  canTransfer,
  onTransfer,
  onConfirm,
}: {
  role: Role;
  hasTransfer: boolean;
  canTransfer: boolean;
  onTransfer: () => void;
  onConfirm: (mode: TransferConfirmMode) => void;
}) {
  if (hasTransfer)
    return role === "admin" ? (
      <>
        <Button variant="primary" onClick={() => onConfirm("sold")}>
          Продано
        </Button>
        <Button onClick={() => onConfirm("return")}>Вернуть в работу</Button>
      </>
    ) : (
      <p className="text-muted">
        Резерв на финальной проверке у администратора.
      </p>
    );
  if (role !== "broker") return null;
  return (
    <Button variant="primary" disabled={!canTransfer} onClick={onTransfer}>
      Зарезервировать
    </Button>
  );
}
