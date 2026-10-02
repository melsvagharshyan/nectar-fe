import { useState } from "react";
import { Avatar, Badge, Count, Empty, Search, Tabs } from "../../../components/ui";
import { BADGE_SAMPLES, KIT_TABS } from "../utils/constants";
import type { KitTab } from "../utils/types";
import { KIT_GRID_2, KIT_LABEL, KIT_PANEL, KIT_ROW } from "../utils/styles";

export function DataDisplayShowcase() {
  const [tab, setTab] = useState<KitTab>("all");
  const [query, setQuery] = useState("");
  return (
    <div className="flex flex-col gap-22">
      <div>
        <span className={KIT_LABEL}>Табы</span>
        <Tabs items={KIT_TABS} value={tab} onChange={setTab} classNames={{ root: "gap-6" }} />
      </div>
      <div className={KIT_GRID_2}>
        <div>
          <span className={KIT_LABEL}>Поиск</span>
          <Search value={query} onChange={setQuery} label="Поиск клиента" />
        </div>
        <div>
          <span className={KIT_LABEL}>Статусы</span>
          <div className={KIT_ROW}>
            {BADGE_SAMPLES.map((value) => (
              <Badge key={value} value={value} />
            ))}
          </div>
        </div>
        <div>
          <span className={KIT_LABEL}>Аватары и счётчики</span>
          <div className={KIT_ROW}>
            <Avatar name="Елена Морозова" />
            <Avatar name="Павел Орлов" className="size-40" />
            <Avatar name="Мария Левина" src="/assets/avatars/person-05.webp" className="size-44" />
            <Count>8</Count>
            <Count className="bg-accent text-white">4</Count>
          </div>
        </div>
        <div className={KIT_PANEL}>
          <Empty text="Предложения пока не получены" className="py-16" />
        </div>
      </div>
    </div>
  );
}
