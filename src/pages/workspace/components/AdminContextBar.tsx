import { navigate } from "../../../app/router";
import { Button } from "../../../components/ui";

export function AdminContextBar({
  company,
  companyName,
}: {
  company: string;
  companyName: string;
}) {
  return (
    <div className="flex items-center gap-14 border-b border-accent-edge bg-accent-tint px-18 py-8 text-[12px] max-lg:flex-wrap">
      <Button variant="ghost" className="px-8 py-5" onClick={() => navigate("/admin/companies")}>
        ← Компании
      </Button>
      <strong>
        Компания {company} · {companyName}
      </strong>
      <span className="text-muted">Просмотр администратора</span>
    </div>
  );
}
