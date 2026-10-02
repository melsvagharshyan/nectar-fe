import { Table, type TableProps } from "antd";
import { cn } from "../../utils/helpers";
import { TABLE_WRAP } from "../../utils/styles";
import { Empty } from "./Empty";

export function DataTable<T extends object>({
  className,
  emptyText = "Нет данных",
  ...props
}: TableProps<T> & { emptyText?: string }) {
  return (
    <Table<T>
      className={cn(TABLE_WRAP, className)}
      pagination={false}
      scroll={{ x: "max-content" }}
      locale={{ emptyText: <Empty text={emptyText} /> }}
      {...props}
    />
  );
}
