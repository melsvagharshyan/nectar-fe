import { useDemo } from "../../../app/DemoProvider";
import { navigate } from "../../../app/router";
import { Button, Empty } from "../../../components/ui";
import { brokerCompanyIdFor } from "../../../utils/helpers";

export function WorkspaceUnavailable({ admin }: { admin: boolean }) {
  const [state] = useDemo();
  return (
    <Empty text="Запись недоступна в этом кабинете">
      <Button
        onClick={() =>
          navigate(
            admin ? "/admin/workspace" : "/broker/workspace",
            admin ? { company: brokerCompanyIdFor(state) } : {},
          )
        }
      >
        Вернуться в кабинет
      </Button>
    </Empty>
  );
}
