import type { TableColumnsType } from "antd";
import { panel } from "../../../app/router";
import { Button, DataTable, type TablePaging } from "../../../components/ui";
import { offerPresentation } from "../../../demo/selectors";
import type { DemoState, Offer } from "../../../demo/types";
import { money } from "../../../utils/helpers";
import { companyName } from "../utils/helpers";

export function AdminOffersTable({
  state,
  offers,
  paging,
  loading,
}: {
  state: DemoState;
  offers: Offer[];
  paging: TablePaging;
  loading: boolean;
}) {
  const propertyOf = (o: Offer) =>
    state.properties.find((x) => x.id === o.propertyId)!;
  const columns: TableColumnsType<Offer> = [
    {
      title: "Предложение / запрос",
      key: "offer",
      render: (_, o) => (
        <>
          <strong>{o.id}</strong>
          <Button
            variant="link"
            onClick={() => panel("request", { request: o.requestId })}
          >
            {o.requestId}
          </Button>
        </>
      ),
    },
    {
      title: "Объект",
      key: "property",
      render: (_, o) => {
        const p = propertyOf(o);
        return (
          <>
            {p.id} · {p.district}
            <small>{money(p.price)}</small>
          </>
        );
      },
    },
    {
      title: "Партнёр",
      key: "partner",
      responsive: ["lg"],
      render: (_, o) => companyName(state, o.companyId),
    },
    {
      title: "Результат",
      key: "result",
      render: (_, o) => offerPresentation(state, o, { role: "admin" }).label,
    },
    {
      title: "Действие",
      key: "action",
      render: (_, o) => (
        <Button onClick={() => panel("property", { object: o.propertyId })}>
          Объект
        </Button>
      ),
    },
  ];
  return (
    <DataTable<Offer>
      rowKey="id"
      columns={columns}
      dataSource={offers}
      paging={paging}
      loading={loading}
      emptyText="Предложения не найдены"
    />
  );
}
