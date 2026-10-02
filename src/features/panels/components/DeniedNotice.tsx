import { closePanel } from "../../../app/router";
import { Button, Empty } from "../../../components/ui";

export function DeniedNotice() {
  return (
    <Empty text="Запись недоступна">
      <Button onClick={closePanel}>Вернуться</Button>
    </Empty>
  );
}
