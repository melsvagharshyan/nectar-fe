import type { TableColumnsType } from "antd";
import { panel } from "../../../app/router";
import { Badge, Button, DataTable } from "../../../components/ui";
import type { DemoState, Request } from "../../../demo/types";
import { money } from "../../../utils/helpers";
import { companyName } from "../utils/helpers";

export function AdminRequestsTable({
  state,
  requests,
}: {
  state: DemoState;
  requests: Request[];
}) {
  const clientOf = (r: Request) =>
    state.clients.find((x) => x.id === r.clientId)!;
  const columns: TableColumnsType<Request> = [
    {
      title: "Запрос / клиент",
      key: "request",
      render: (_, r) => (
        <>
          <strong>{r.id}</strong>
          <small>{clientOf(r).name}</small>
        </>
      ),
    },
    {
      title: "Компания",
      key: "company",
      responsive: ["lg"],
      render: (_, r) => companyName(state, clientOf(r).companyId),
    },
    {
      title: "Параметры",
      key: "parameters",
      render: (_, r) => (
        <>
          {r.type}
          <small>
            {r.districts.join(" / ")} · до {money(r.budgetMax)}
          </small>
          <small>
            {state.offers.filter((o) => o.requestId === r.id).length} предложений
          </small>
        </>
      ),
    },
    {
      title: "Этап",
      key: "stage",
      render: (_, r) => <Badge value={r.stage} />,
    },
    {
      title: "Действие",
      key: "action",
      render: (_, r) => {
        const inCrm = r.stage === "crm";
        return (
          <Button
            onClick={() =>
              panel(inCrm ? "transfer" : "request", {
                request: r.id,
                client: r.clientId,
              })
            }
          >
            {inCrm ? "Рассмотреть" : "Открыть"}
          </Button>
        );
      },
    },
  ];
  return (
    <DataTable<Request>
      rowKey="id"
      columns={columns}
      dataSource={requests}
      emptyText="Запросы не найдены"
    />
  );
}
