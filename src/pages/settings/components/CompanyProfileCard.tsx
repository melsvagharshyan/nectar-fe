import { panel } from "../../../app/router";
import { Avatar, Button } from "../../../components/ui";
import type { Company } from "../utils/types";
import { BOX, NOTICE, STACK } from "../../../utils/styles";
import { cn } from "../../../utils/helpers";

export function CompanyProfileCard({ company: c }: { company: Company }) {
  return (
    <div className={cn(BOX, STACK)}>
      <Avatar name={c.name} />
      <h2>{c.name}</h2>
      <p>{c.id}</p>
      <p className="text-muted">{c.contact}</p>
      <Button
        onClick={() => panel("company-form", { company: c.id, mode: "edit" })}
      >
        Изменить
      </Button>
      <p className={NOTICE}>
        Это кликабельный прототип. Изменения сохраняются только до обновления
        страницы. Реальные аккаунты отсутствуют.
      </p>
    </div>
  );
}
