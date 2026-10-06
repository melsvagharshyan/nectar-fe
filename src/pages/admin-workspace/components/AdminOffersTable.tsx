import { useState } from "react";
import type { TableColumnsType } from "antd";
import { panel } from "../../../app/router";
import { useWorkspaceDispatch } from "../../../app/utils/hooks";
import { notify } from "../../../components/toaster";
import { ReviewRejectDialog } from "../../../features/panels/components/ReviewRejectDialog";
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
  const { dispatch } = useWorkspaceDispatch();
  const [declining, setDeclining] = useState<Offer>();
  const actor = { role: "admin" } as const;
  const propertyOf = (o: Offer) =>
    state.properties.find((x) => x.id === o.propertyId)!;
  const approve = async (o: Offer) => {
    const { error } = await dispatch({ type: "APPROVE_OFFER", actor, offerId: o.id });
    if (!error)
      notify.success("Предложение одобрено", {
        description: "Брокер уже видит его в подборке",
      });
  };
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
      render: (_, o) => (
        <>
          {offerPresentation(state, o, actor).label}
          {o.review === "rejected" && o.rejectReason && (
            <small>{o.rejectReason}</small>
          )}
        </>
      ),
    },
    {
      title: "Действие",
      key: "action",
      render: (_, o) => (
        <div className="flex flex-wrap gap-6">
          <Button onClick={() => panel("property", { object: o.propertyId })}>
            Объект
          </Button>
          {o.review === "pending" && (
            <>
              <Button onClick={() => setDeclining(o)}>Отклонить</Button>
              <Button variant="primary" onClick={() => approve(o)}>
                Одобрить
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <DataTable<Offer>
        rowKey="id"
        columns={columns}
        dataSource={offers}
        paging={paging}
        loading={loading}
        emptyText="Предложения не найдены"
      />
      {declining && (
        <ReviewRejectDialog
          title={`Отклонить предложение ${declining.id}?`}
          notice="Партнёр увидит причину, исправит объект и отправит предложение повторно. Брокер его не увидит."
          submitLabel="Отклонить предложение"
          onCancel={() => setDeclining(undefined)}
          onConfirm={async ({ reason }) => {
            const { error } = await dispatch({
              type: "DECLINE_OFFER",
              actor,
              offerId: declining.id,
              reason,
            });
            if (error) return;
            setDeclining(undefined);
            notify.success("Предложение отклонено", {
              description: "Партнёр увидит причину",
            });
          }}
        />
      )}
    </>
  );
}
