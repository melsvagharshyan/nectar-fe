import { useState } from "react";
import { Controller } from "react-hook-form";
import type { Registration } from "../../api/registrations-api-ts/types";
import { PageHead } from "../../components/PageHead";
import { Select } from "../../components/form";
import { Empty, InfiniteList, Search, Tabs } from "../../components/ui";
import { PAGE, TOOLBAR, TWO_COL } from "../../utils/styles";
import { ApproveDialog } from "./components/ApproveDialog";
import { RegistrationCard } from "./components/RegistrationCard";
import { RejectDialog } from "./components/RejectDialog";
import { EMPTY_TEXT, ROLE_FILTER_OPTIONS } from "./utils/constants";
import { useRegistrationActions, useRegistrations } from "./utils/hooks";

type Dialog = { kind: "approve" | "reject"; registration: Registration } | null;

/** Admin queue of self-service sign-ups. */
export function Registrations() {
  const model = useRegistrations();
  const { approve, reject } = useRegistrationActions();
  const [dialog, setDialog] = useState<Dialog>(null);
  const close = () => setDialog(null);

  return (
    <div className={PAGE}>
      <PageHead
        title="Заявки"
        subtitle="Регистрации брокеров, ожидающие проверки"
      />
      <Tabs items={model.tabs} value={model.status} onChange={model.setStatus} />
      <div className={TOOLBAR}>
        <Controller
          name="search"
          control={model.filterControl}
          render={({ field }) => (
            <Search {...field} label="Имя, email или компания" />
          )}
        />
        <Controller
          name="role"
          control={model.filterControl}
          render={({ field }) => (
            <Select
              {...field}
              aria-label="Роль"
              placeholder="Все роли"
              options={ROLE_FILTER_OPTIONS}
            />
          )}
        />
      </div>
      <InfiniteList
        className={TWO_COL}
        hasMore={model.hasMore}
        loading={model.loadingMore}
        onLoadMore={model.loadMore}
      >
        {model.registrations.map((r) => (
          <RegistrationCard
            key={r.id}
            registration={r}
            onApprove={() => setDialog({ kind: "approve", registration: r })}
            onReject={() => setDialog({ kind: "reject", registration: r })}
          />
        ))}
      </InfiniteList>
      {!model.registrations.length && !model.loading && (
        <Empty text={EMPTY_TEXT[model.status]} />
      )}

      {dialog?.kind === "approve" && (
        <ApproveDialog
          registration={dialog.registration}
          onCancel={close}
          onConfirm={async () => {
            if (await approve(dialog.registration)) close();
          }}
        />
      )}
      {dialog?.kind === "reject" && (
        <RejectDialog
          registration={dialog.registration}
          onCancel={close}
          onConfirm={async (reason) => {
            if (await reject(dialog.registration, reason)) close();
          }}
        />
      )}
    </div>
  );
}
