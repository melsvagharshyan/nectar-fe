import { Button, Overlay, OverlayFooter } from "../ui";

export function CloseConfirmation({
  onStay,
  onClose,
}: {
  onStay: () => void;
  onClose: () => void;
}) {
  return (
    <Overlay title="Закрыть несохранённую форму?" modal onClose={onStay}>
      <p>Несохранённые изменения будут потеряны.</p>
      <OverlayFooter>
        <Button onClick={onStay}>Остаться</Button>
        <Button onClick={onClose}>Закрыть без сохранения</Button>
      </OverlayFooter>
    </Overlay>
  );
}
