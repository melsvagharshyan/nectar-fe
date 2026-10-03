import { Table, type TableProps } from "antd";
import { cn } from "../../utils/helpers";
import { TABLE_PAGINATION, TABLE_WRAP } from "../../utils/styles";
import { Empty } from "./Empty";

export interface TablePaging {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export function DataTable<T extends object>({
  className,
  emptyText = "Нет данных",
  paging,
  ...props
}: TableProps<T> & { emptyText?: string; paging?: TablePaging }) {
  return (
    <Table<T>
      className={cn(TABLE_WRAP, className)}
      pagination={
        paging && paging.total > paging.pageSize
          ? {
              current: paging.page,
              pageSize: paging.pageSize,
              total: paging.total,
              onChange: paging.onChange,
              showSizeChanger: false,
              className: TABLE_PAGINATION,
              showTotal: (total, [from, to]) => `${from}–${to} из ${total}`,
            }
          : false
      }
      scroll={{ x: "max-content" }}
      locale={{ emptyText: <Empty text={emptyText} /> }}
      {...props}
    />
  );
}
