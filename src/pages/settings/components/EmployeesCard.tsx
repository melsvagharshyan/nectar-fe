import { panel } from "../../../app/router";
import { Button } from "../../../components/ui";
import type { Employee } from "../utils/types";
import { BOX, RECORD, ROW } from "../../../utils/styles";
import { cn } from "../../../utils/helpers";

export function EmployeesCard({
  companyId,
  employees,
}: {
  companyId: string;
  employees: Employee[];
}) {
  return (
    <div className={BOX}>
      <div className={cn(ROW, "justify-between")}>
        <h2>Сотрудники</h2>
        <Button onClick={() => panel("employee-form", { company: companyId })}>
          Добавить сотрудника
        </Button>
      </div>
      {employees.map((e) => (
        <div className={RECORD} key={e.id}>
          <div>
            <strong>{e.name}</strong>
            <small>{e.id}</small>
            <p className="text-muted">{e.phone}</p>
          </div>
          <Button
            onClick={() =>
              panel("employee-form", {
                employee: e.id,
                company: companyId,
                mode: "edit",
              })
            }
          >
            Изменить
          </Button>
        </div>
      ))}
    </div>
  );
}
