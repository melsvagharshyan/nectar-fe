import { Controller } from "react-hook-form";
import { Select } from "../../components/form";
import { PageHead } from "../../components/PageHead";
import type { Role } from "../../demo/types";
import { CompanyProfileCard } from "./components/CompanyProfileCard";
import { EmployeesCard } from "./components/EmployeesCard";
import { useSettings } from "./utils/hooks";
import { PAGE, TWO_COL } from "../../utils/styles";

export function Settings({ role }: { role: Role }) {
  const { companies, company, employees, control } = useSettings(role);
  return (
    <div className={PAGE}>
      <PageHead
        title={role === "admin" ? "Настройки" : "Настройки компании"}
        subtitle="Сотрудники — внутренний справочник, без отдельных аккаунтов"
      >
        {role === "admin" && (
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                aria-label="Компания для настроек"
                options={companies.map((c) => ({ value: c.id, label: c.name }))}
              />
            )}
          />
        )}
      </PageHead>
      <div className={TWO_COL}>
        <CompanyProfileCard company={company} />
        <EmployeesCard companyId={company.id} employees={employees} />
      </div>
    </div>
  );
}
