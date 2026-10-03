import type { TableColumnsType } from "antd";
import { navigate, panel } from "../../../app/router";
import { Button, DataTable, type TablePaging } from "../../../components/ui";
import { formatDate, money } from "../../../utils/helpers";
import type { PartnerData, PartnerOffer } from "../utils/types";

export function PartnerOffersTable({
  offers,
  propertyOf,
  resultOf,
  paging,
  loading,
}: {
  offers: PartnerOffer[];
  propertyOf: (offer: PartnerOffer) => PartnerData["properties"][number];
  resultOf: (offer: PartnerOffer) => string;
  paging: TablePaging;
  loading: boolean;
}) {
  const columns: TableColumnsType<PartnerOffer> = [
    {
      title: "Запрос",
      key: "request",
      render: (_, o) => (
        <Button
          variant="link"
          onClick={() => navigate("/partner/requests", { request: o.requestId })}
        >
          {o.requestId}
        </Button>
      ),
    },
    {
      title: "Объект",
      key: "property",
      render: (_, o) => {
        const p = propertyOf(o);
        return (
          <Button variant="link" onClick={() => panel("property", { object: p.id })}>
            {p.id} · {p.district}
          </Button>
        );
      },
    },
    {
      title: "Цена",
      key: "price",
      render: (_, o) => money(propertyOf(o).price),
    },
    {
      title: "Дата",
      key: "date",
      responsive: ["lg"],
      render: (_, o) => formatDate(o.createdAt),
    },
    {
      title: "Результат",
      key: "result",
      render: (_, o) => resultOf(o),
    },
  ];
  return (
    <DataTable<PartnerOffer>
      className="mt-20"
      rowKey="id"
      columns={columns}
      dataSource={offers}
      emptyText="Предложений в этой категории нет"
      paging={paging}
      loading={loading}
    />
  );
}
