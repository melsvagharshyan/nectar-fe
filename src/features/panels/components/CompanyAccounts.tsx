import { useState } from "react";
import {
  useBlockUserMutation,
  useGetCompanyAccountsQuery,
  useUnblockUserMutation,
} from "../../../api/accounts-api-ts/accountsApi";
import type { Account } from "../../../api/accounts-api-ts/types";
import { getApiErrorMessage } from "../../../api/errors";
import { notify } from "../../../components/toaster";
import { Button, Overlay, OverlayFooter } from "../../../components/ui";
import { cn, formatDate } from "../../../utils/helpers";
import { RECORD } from "../../../utils/styles";
import { BlockAccountDialog } from "./BlockAccountDialog";

const DATE = { day: "numeric", month: "short", year: "numeric" } as const;
const STATUS = "rounded-full px-8 py-3 text-[11px] font-semibold whitespace-nowrap";

type Dialog = { kind: "block" | "unblock"; account: Account } | null;

/** Sign-in accounts of a company, which admins can block and unblock. */
export function CompanyAccounts({ companyId }: { companyId: string }) {
  const { data: accounts, isLoading, isError } = useGetCompanyAccountsQuery(companyId);
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [dialog, setDialog] = useState<Dialog>(null);
  const [busy, setBusy] = useState(false);
  const close = () => setDialog(null);

  const block = async (account: Account, reason: string) => {
    const result = await blockUser({ id: account.id, reason });
    if (result.error) {
      notify.error("Не удалось заблокировать", { description: getApiErrorMessage(result.error) });
      return;
    }
    notify.success("Аккаунт заблокирован", {
      description: "Пользователь потеряет доступ при следующем действии.",
    });
    close();
  };

  const unblock = async (account: Account) => {
    setBusy(true);
    const result = await unblockUser(account.id);
    setBusy(false);
    if (result.error) {
      notify.error("Не удалось разблокировать", { description: getApiErrorMessage(result.error) });
      return;
    }
    notify.success("Доступ восстановлен", { description: account.email });
    close();
  };

  if (isLoading) return <p className="text-muted">Загрузка…</p>;
  if (isError) return <p className="text-danger">Не удалось загрузить аккаунты</p>;
  if (!accounts?.length) return <p className="text-muted">У компании нет аккаунтов для входа</p>;

  return (
    <>
      {accounts.map((a) => (
        <div className={RECORD} key={a.id}>
          <div className="min-w-0">
            <strong className="block">{a.name}</strong>
            <small className="text-muted">
              {a.email} · с {formatDate(a.createdAt, DATE)}
            </small>
            {a.blockedAt && (
              <p className="break-words whitespace-pre-line">
                {a.blockReason}
                {a.blockedByName && ` — заблокировал ${a.blockedByName}`}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-10">
            <span
              className={cn(
                STATUS,
                a.blockedAt ? "bg-danger-tint text-danger" : "bg-success-tint text-success",
              )}
            >
              {a.blockedAt
                ? `Заблокирован · ${formatDate(a.blockedAt, DATE)}`
                : "Активен"}
            </span>
            {a.role !== "admin" &&
              (a.blockedAt ? (
                <Button onClick={() => setDialog({ kind: "unblock", account: a })}>
                  Разблокировать
                </Button>
              ) : (
                <Button
                  className="text-danger hover:not-disabled:bg-danger-tint"
                  onClick={() => setDialog({ kind: "block", account: a })}
                >
                  Заблокировать
                </Button>
              ))}
          </div>
        </div>
      ))}

      {dialog?.kind === "block" && (
        <BlockAccountDialog
          account={dialog.account}
          onCancel={close}
          onConfirm={(reason) => block(dialog.account, reason)}
        />
      )}
      {dialog?.kind === "unblock" && (
        <Overlay title="Разблокировать аккаунт?" modal onClose={close}>
          <p>
            {dialog.account.name} ({dialog.account.email}) снова сможет войти в Nectar.
          </p>
          <OverlayFooter>
            <Button onClick={close}>Отмена</Button>
            <Button variant="primary" disabled={busy} onClick={() => unblock(dialog.account)}>
              {busy ? "Разблокируем…" : "Разблокировать"}
            </Button>
          </OverlayFooter>
        </Overlay>
      )}
    </>
  );
}
