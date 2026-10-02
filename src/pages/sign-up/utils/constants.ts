import type { Role } from "../../../demo/types";
import type { RoleOptionDetails, SignUpFormValues } from "./types";

export const SIGN_UP_FORM_ID = "sign-up-form";

export const SIGN_UP_DEFAULTS: SignUpFormValues = {
  role: "broker",
  name: "",
  email: "",
  phone: "",
  companyName: "",
  adminCode: "",
  password: "",
  confirmPassword: "",
};

export const MIN_PASSWORD_LENGTH = 8;

export const ROLE_OPTIONS: Record<Role, RoleOptionDetails> = {
  broker: {
    icon: "users",
    description: "Клиенты, запросы и предложения объектов.",
    companyLabel: "Агентство в России",
  },
  partner: {
    icon: "home",
    description: "Обезличенные запросы, подбор и отправка объектов.",
    companyLabel: "Агентство в Армении",
  },
  admin: {
    icon: "chart",
    description: "Компании, передачи в CRM и результаты сделок.",
  },
};
