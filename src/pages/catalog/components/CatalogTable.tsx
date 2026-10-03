import type { TableColumnsType } from "antd";
import { Badge, DataTable, type TablePaging } from "../../../components/ui";
import { propertyInterest } from "../../../demo/selectors";
import type { DemoState, Role } from "../../../demo/types";
import { coverImage, money } from "../../../utils/helpers";
import { ownerCompanyId, propertyParameters } from "../utils/helpers";
import type { CatalogProperty } from "../utils/types";
import { CATALOG_ID, CATALOG_PRICE, CATALOG_THUMB } from "../utils/styles";
import { PropertyActionsMenu } from "./PropertyActionsMenu";

export function CatalogTable({
  state,
  role,
  properties,
  offers,
  paging,
  loading,
}: {
  state: DemoState;
  role: Role;
  properties: CatalogProperty[];
  offers: { propertyId: string }[];
  paging: TablePaging;
  loading: boolean;
}) {
  const columns: TableColumnsType<CatalogProperty> = [
    {
      title: "ID",
      key: "id",
      render: (_, p) => <span className={CATALOG_ID}>{p.id}</span>,
    },
    {
      title: "Фото",
      key: "photo",
      responsive: ["lg"],
      render: (_, p) => (
        <img
          className={CATALOG_THUMB}
          src={coverImage(p.media)}
          alt={p.title}
          loading="lazy"
          decoding="async"
        />
      ),
    },
    {
      title: "Объект / адрес",
      key: "title",
      render: (_, p) => (
        <>
          <strong>{p.title}</strong>
          <small>{p.district}</small>
        </>
      ),
    },
    {
      title: "Цена",
      key: "price",
      render: (_, p) => (
        <>
          <strong className={CATALOG_PRICE}>{money(p.price)}</strong>
          <small>{money(p.price / p.area)} / м²</small>
        </>
      ),
    },
    {
      title: "Параметры",
      key: "parameters",
      render: (_, p) => {
        const parameters = propertyParameters(p);
        return (
          <>
            <strong>{parameters.size}</strong>
            <small>{parameters.details}</small>
          </>
        );
      },
    },
    {
      title: "Статус",
      key: "status",
      render: (_, p) => (
        <>
          <Badge value={p.availability} />
          {!p.media.length && <small>Нет фото</small>}
        </>
      ),
    },
    ...(role === "admin"
      ? [
          {
            title: "Владелец",
            key: "owner",
            responsive: ["lg"],
            render: (_: unknown, p: CatalogProperty) =>
              state.companies.find((c) => c.id === ownerCompanyId(p))?.name,
          } satisfies TableColumnsType<CatalogProperty>[number],
        ]
      : []),
    {
      title: "Предложения / интерес",
      key: "interest",
      responsive: ["lg"],
      render: (_, p) =>
        `${offers.filter((o) => o.propertyId === p.id).length} / ${propertyInterest(state, p.id)}`,
    },
    {
      title: <span className="sr-only">Действия</span>,
      key: "actions",
      width: 56,
      align: "right",
      render: (_, p) => <PropertyActionsMenu property={p} role={role} />,
    },
  ];

  return (
    <DataTable<CatalogProperty>
      rowKey="id"
      columns={columns}
      dataSource={properties}
      emptyText="Объекты не найдены"
      paging={paging}
      loading={loading}
    />
  );
}
