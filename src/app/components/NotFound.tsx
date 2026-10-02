import { Button, Empty } from "../../components/ui";
import { navigate } from "../router";

export function NotFound({
  actionLabel,
  target,
}: {
  actionLabel: string;
  target: string;
}) {
  return (
    <Empty text="Страница не найдена">
      <Button onClick={() => navigate(target)}>{actionLabel}</Button>
    </Empty>
  );
}
