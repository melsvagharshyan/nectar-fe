import type { ReactNode } from "react";
import { panel } from "../../../app/router";
import type { Registration } from "../../../api/registrations-api-ts/types";
import { Avatar, Button } from "../../../components/ui";
import { BOX, RECORD, ROW } from "../../../utils/styles";
import { ROLE_LABELS, ROLE_TAGS } from "../utils/constants";
import { formatDateTime } from "../utils/helpers";

const TAG = "rounded-[4px] bg-fill px-6 py-1 text-[10px] font-semibold tracking-[0.3px] text-muted";

export function RegistrationCard({
  registration: r,
  onApprove,
  onReject,
}: {
  registration: Registration;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className={BOX}>
      <div className={ROW}>
        <Avatar name={r.name} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-8">
            <h2 className="!mb-0 truncate">{r.name}</h2>
            <span className={TAG} title={ROLE_LABELS[r.role]}>
              {ROLE_TAGS[r.role]}
            </span>
          </div>
          <small className="text-muted">подана {formatDateTime(r.createdAt)}</small>
        </div>
      </div>
      <div className="mt-12">
        <Detail label="Компания">{r.companyName}</Detail>
        <Detail label="Email">{r.email}</Detail>
        <Detail label="Телефон">{r.phone || "—"}</Detail>
        {r.status !== "pending" && (
          <Detail label={r.status === "approved" ? "Одобрил" : "Отклонил"}>
            {r.reviewedByName ?? "—"}
            {r.reviewedAt && ` · ${formatDateTime(r.reviewedAt)}`}
          </Detail>
        )}
      </div>

      {r.status === "rejected" && r.rejectReason && (
        <p className="mt-12 rounded-[12px] bg-danger-tint p-12 text-[13px] break-words whitespace-pre-line text-ink">
          <span className="font-semibold text-danger">Сообщение заявителю: </span>
          {r.rejectReason}
        </p>
      )}

      {r.status === "approved" && r.userBlockedAt && (
        <p className="mt-12 rounded-[12px] bg-danger-tint p-12 text-[13px] text-danger">
          <span className="font-semibold">Аккаунт заблокирован</span>
          {r.userBlockReason && ` · ${r.userBlockReason}`}
        </p>
      )}

      {r.status === "pending" && (
        <div className="mt-20 flex flex-wrap gap-10">
          <Button variant="primary" onClick={onApprove}>
            Одобрить
          </Button>
          <Button
            className="text-danger hover:not-disabled:bg-danger-tint"
            onClick={onReject}
          >
            Отклонить
          </Button>
        </div>
      )}
      {r.status === "approved" && r.companyId && (
        <Button
          variant="secondary"
          className="mt-20"
          onClick={() => panel("company", { company: r.companyId! })}
        >
          Компания {r.companyId} →
        </Button>
      )}
    </div>
  );
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={RECORD}>
      <span className="text-muted">{label}</span>
      <strong className="min-w-0 text-right break-words">{children}</strong>
    </div>
  );
}
