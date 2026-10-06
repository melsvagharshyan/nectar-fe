import { useState } from "react";
import type { Registration } from "../../../api/registrations-api-ts/types";
import { Button, Overlay, OverlayFooter } from "../../../components/ui";

export function ApproveDialog({
  registration: { companyName, email },
  onCancel,
  onConfirm,
}: {
  registration: Registration;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <Overlay title="Одобрить заявку?" modal onClose={onCancel}>
      <p>
        Создать компанию «{companyName}» и открыть доступ {email}?
      </p>
      <OverlayFooter>
        <Button onClick={onCancel}>Отмена</Button>
        <Button
          variant="primary"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            await onConfirm();
            setBusy(false);
          }}
        >
          {busy ? "Одобряем…" : "Одобрить"}
        </Button>
      </OverlayFooter>
    </Overlay>
  );
}
