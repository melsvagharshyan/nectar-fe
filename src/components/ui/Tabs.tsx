import type { ReactNode } from "react";
import { cn } from "../../utils/helpers";
import { Button } from "./Button";
import { Count } from "./Count";

export interface TabItem<T extends string> {
  id: T;
  label: ReactNode;
  count?: number;
}

export interface TabsClassNames {
  root?: string;
  tab?: string;
  count?: string;
}

export function Tabs<T extends string>({
  items,
  value,
  onChange,
  classNames = {},
}: {
  items: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  classNames?: TabsClassNames;
}) {
  return (
    <div className={cn("tabs flex flex-wrap gap-5 max-xs:gap-0", classNames.root)}>
      {items.map((item) => (
        <Button
          key={item.id}
          variant="tab"
          active={value === item.id}
          className={classNames.tab}
          onClick={() => onChange(item.id)}
        >
          {item.label}
          {item.count !== undefined && (
            <>
              {" "}
              <Count className={classNames.count}>{item.count}</Count>
            </>
          )}
        </Button>
      ))}
    </div>
  );
}
