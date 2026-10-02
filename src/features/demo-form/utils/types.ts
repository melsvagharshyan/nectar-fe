import type { Client, Company, Employee, Request } from "../../../demo/types";

export type DemoFormKind = "client" | "request" | "company" | "employee";

export interface DemoFormProps {
  kind: DemoFormKind;
  id?: string;
  clientId?: string;
  companyId?: string;
  onClose: () => void;
  onSuccess: (text: string) => void;
}

export interface DemoFormValues {
  name: string;
  phone: string;
  email: string;
  employeeId: string;
  companyKind: string;
  website: string;
  active: string;
  type: string;
  budgetMin: string;
  budgetMax: string;
  areaMin: string;
  areaMax: string;
  rooms: string;
  goal: string;
  term: string;
  notes: string;
  market: string;
  repair: string;
  furniture: string;
  parking: string;
  view: string;
  districts: string[];
  amenities: string[];
}

export interface DemoFormRecords {
  company: string;
  client?: Client;
  request?: Request;
  requestClient?: Client;
  employee?: Employee;
  existingCompany?: Company;
  staff: Employee[];
  unavailable: boolean;
}
