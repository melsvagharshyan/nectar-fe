import type { TableColumnsType } from "antd";
import { navigate, panel } from "../../../app/router";
import { Button, DataTable, type TablePaging } from "../../../components/ui";
import type { offerPresentation } from "../../../demo/selectors";
import { formatDate, money } from "../../../utils/helpers";
import type { PartnerData, PartnerOffer } from "../utils/types";

export function PartnerOffersTable({
  offers,
  propertyOf,
  presentationOf,
  onResubmit,
  paging,
  loading,
}: {
  offers: PartnerOffer[];
  propertyOf: (offer: PartnerOffer) => PartnerData["properties"][number];
  presentationOf: (offer: PartnerOffer) => ReturnType<typeof offerPresentation>;
  onResubmit: (offer: PartnerOffer) => void;
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
      render: (_, o) => {
        const presentation = presentationOf(o);
        return (
          <>
            {presentation.label}
            {o.review === "rejected" && o.rejectReason && (
              <small>Причина: {o.rejectReason}</small>
            )}
            {presentation.canResubmit && (
              <div className="mt-6 flex flex-wrap gap-6">
                <Button onClick={() => panel("property", { object: o.propertyId })}>
                  Исправить объект
                </Button>
                <Button variant="primary" onClick={() => onResubmit(o)}>
                  Отправить повторно
                </Button>
              </div>
            )}
          </>
        );
      },
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
