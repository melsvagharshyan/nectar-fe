import { useState } from "react";
import { Controller } from "react-hook-form";
import { closePanel, navigate } from "../../../app/router";
import { toBrokerView } from "../../../demo/projections";
import { Badge, Button, Overlay, Search, Tabs } from "../../../components/ui";
import { brokerCompanyIdFor, matchesSearch } from "../../../utils/helpers";
import { useFilterForm } from "../../../utils/hooks";
import { ROLE_WORKSPACE } from "../../../utils/navigation";
import { DIRECTORY_TABS } from "../utils/constants";
import { usePanelContext } from "../utils/hooks";
import type { DirectoryTab, PanelProps } from "../utils/types";
import { DeniedNotice } from "./DeniedNotice";
import { RECORD } from "../../../utils/styles";

export function DirectoryPanel({ role }: Pick<PanelProps, "role">) {
  const { state, params, goToRequest } = usePanelContext(role);
  const [tab, setTab] = useState<DirectoryTab>("clients");
  const { control, values } = useFilterForm({ search: "" });
  const scope =
    (role === "admin" && params.companyId) || brokerCompanyIdFor(state);
  const data = toBrokerView(state, scope);
  const clients = data.clients.filter((c) =>
    matchesSearch(`${c.name} ${c.id}`, values.search),
  );
  const requests = data.requests.filter((r) =>
    matchesSearch(`${r.id} ${r.type} ${r.districts.join(" ")}`, values.search),
  );

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
          {tab === "clients"
            ? clients.map((c) => (
                <div className={RECORD} key={c.id}>
                  <span>
                    {c.name} · {c.id}
                  </span>
                  <Button
                    onClick={() =>
                      navigate(ROLE_WORKSPACE[role], {
                        client: c.id,
                        ...(role === "admin" ? { company: scope } : {}),
                      })
                    }
                  >
                    Выбрать
                  </Button>
                </div>
              ))
            : requests.map((r) => (
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
        </>
      )}
    </Overlay>
  );
}
