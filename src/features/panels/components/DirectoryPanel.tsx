import { useState } from "react";
import { Controller } from "react-hook-form";
import { closePanel, navigate } from "../../../app/router";
import {
  Badge,
  Button,
  InfiniteList,
  Overlay,
  Search,
  Tabs,
} from "../../../components/ui";
import { useFilterForm } from "../../../utils/hooks";
import { ROLE_WORKSPACE } from "../../../utils/navigation";
import { DIRECTORY_TABS } from "../utils/constants";
import { useDirectory, usePanelContext } from "../utils/hooks";
import type { DirectoryTab, PanelProps } from "../utils/types";
import { DeniedNotice } from "./DeniedNotice";
import { RECORD } from "../../../utils/styles";

export function DirectoryPanel({ role }: Pick<PanelProps, "role">) {
  const { goToRequest } = usePanelContext(role);
  const [tab, setTab] = useState<DirectoryTab>("clients");
  const { control, values } = useFilterForm({ search: "" });
  const directory = useDirectory(role, tab, values.search);

  return (
    <Overlay title="Клиенты и запросы компании" wide onClose={closePanel}>
      {role === "partner" ? (
        <DeniedNotice />
      ) : (
        <>
          <Tabs items={DIRECTORY_TABS} value={tab} onChange={setTab} />
          <div className="mt-20">
            <Controller
              control={control}
              name="search"
              render={({ field }) => (
                <Search {...field} label="Поиск в списке" />
              )}
            />
          </div>
          <InfiniteList
            hasMore={directory.hasMore}
            loading={directory.loading}
            onLoadMore={directory.loadMore}
          >
            {tab === "clients"
              ? directory.clients.map((c) => (
                  <div className={RECORD} key={c.id}>
                    <span>
                      {c.name} · {c.id}
                    </span>
                    <Button
                      onClick={() =>
                        navigate(ROLE_WORKSPACE[role], {
                          client: c.id,
                          ...(role === "admin" ? { company: directory.company } : {}),
                        })
                      }
                    >
                      Выбрать
                    </Button>
                  </div>
                ))
              : directory.requests.map((r) => (
                  <div className={RECORD} key={r.id}>
                    <div>
                      <strong>
                        {r.id} · {r.type}
                      </strong>
                      <p>{r.districts.join(" / ")}</p>
                      <Badge value={r.stage} />
                    </div>
                    <Button onClick={() => goToRequest(r.id)}>Выбрать</Button>
                  </div>
                ))}
          </InfiniteList>
        </>
      )}
    </Overlay>
  );
}
