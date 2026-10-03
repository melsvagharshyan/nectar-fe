import { closePanel, navigate, panel } from "../../../app/router";
import { Avatar, Button, Overlay, OverlayFooter } from "../../../components/ui";
import { usePanelContext } from "../utils/hooks";
import type { PanelProps } from "../utils/types";
import { CompanyRecords } from "./CompanyRecords";
import { DeniedNotice } from "./DeniedNotice";
import { BOX, RECORD, ROW } from "../../../utils/styles";
import { cn, currentCompanyId } from "../../../utils/helpers";

export function CompanyPanel({ role }: Pick<PanelProps, "role">) {
  const { state, params } = usePanelContext(role);
  const company = state.companies.find(
    (c) =>
      c.id === params.companyId &&
      (role === "admin" || c.id === currentCompanyId()),
  );
  const isRussian = company?.kind === "rf";

  return (
    <Overlay title="Карточка компании" wide onClose={closePanel}>
      {role === "admin" && company ? (
        <>
          <div className={ROW}>
            <Avatar name={company.name} />
            <h2>{company.name}</h2>
          </div>
          <p className="text-muted mt-20">
            {company.id} · {company.contact}
          </p>
          <div className={cn(BOX, "mt-20")}>
            <h3>Сотрудники</h3>
            {state.employees
              .filter((e) => e.companyId === company.id)
              .map((e) => (
                <div className={RECORD} key={e.id}>
                  <span>{e.name}</span>
                  <small>{e.phone}</small>
                </div>
              ))}
          </div>
          <div className={cn(BOX, "mt-20")}>
            <h3>{isRussian ? "Клиенты и запросы" : "Объекты и предложения"}</h3>
            <CompanyRecords company={company} />
          </div>
          <OverlayFooter>
            <Button
              variant="primary"
              onClick={() =>
                navigate(isRussian ? "/admin/workspace" : "/admin/objects", {
                  company: company.id,
                })
              }
            >
              {isRussian
                ? "Открыть рабочий экран компании"
                : "Открыть объекты компании"}
            </Button>
            <Button
              onClick={() =>
                panel("company-form", { company: company.id, mode: "edit" })
              }
            >
              Изменить
            </Button>
          </OverlayFooter>
        </>
      ) : (
        <DeniedNotice />
      )}
    </Overlay>
  );
}
