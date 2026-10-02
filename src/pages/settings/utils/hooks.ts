import { useDemo } from "../../../app/DemoProvider";
import type { Role } from "../../../demo/types";
import { brokerCompanyIdFor, currentCompanyId } from "../../../utils/helpers";
import { useFilterForm } from "../../../utils/hooks";
import type { SettingsFormValues } from "./types";

export function useSettings(role: Role) {
  const [state] = useDemo();
  const form = useFilterForm<SettingsFormValues>({
    company: role === "partner" ? currentCompanyId() : brokerCompanyIdFor(state),
  });
  const company = state.companies.find((c) => c.id === form.values.company)!;
  return {
    companies: state.companies,
    company,
    employees: state.employees.filter((e) => e.companyId === company.id),
    control: form.control,
  };
}
