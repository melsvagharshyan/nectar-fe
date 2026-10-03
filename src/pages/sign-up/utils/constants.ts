import type { Role } from "../../../demo/types";
import type { RoleOptionDetails, SignUpFormValues, SignUpStep, SignUpStepCopy } from "./types";

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

export const SIGN_UP_STEP_ORDER: SignUpStep[] = ["role", "details"];

export const SIGN_UP_STEPS: Record<SignUpStep, SignUpStepCopy> = {
  role: {
    title: "Создайте аккаунт",
    subtitle: "Как вы будете работать в Nectar?",
  },
  details: {
    title: "Расскажите о себе",
    subtitle: "Осталось заполнить пару полей — это займёт минуту",
  },
};

export const ROLE_OPTIONS: Record<Role, RoleOptionDetails> = {
  broker: {
    icon: "users",
    title: "Брокер в России",
    tag: "RU",
    description: "Веду клиентов и ищу для них квартиры в Ереване",
    phonePlaceholder: "+7 900 000-00-00",
    company: { label: "Название агентства", placeholder: "Например, «Дом Риэлт»" },
  },
  partner: {
    icon: "home",
    title: "Брокер в Армении",
    tag: "AM",
    description: "Подбираю объекты под запросы российских коллег",
    phonePlaceholder: "+374 00 000 000",
    company: { label: "Название агентства", placeholder: "Например, «Ереван Эстейт»" },
  },
  admin: {
    icon: "chart",
    title: "Администратор",
    tag: "Nectar",
    description: "Управляю компаниями, передачами в CRM и сделками",
    phonePlaceholder: "+7 900 000-00-00",
  },
};
