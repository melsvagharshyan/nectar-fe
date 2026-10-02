import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { KIT_FORM_DEFAULTS } from "./constants";
import type { KitFormValues } from "./types";
import { kitFormSchema } from "./validations";

export function useKitForm() {
  const [submitted, setSubmitted] = useState<KitFormValues | null>(null);
  const form = useForm<KitFormValues>({
    resolver: zodResolver(kitFormSchema),
    defaultValues: KIT_FORM_DEFAULTS,
  });
  return {
    form,
    submitted,
    onSubmit: form.handleSubmit((values) => setSubmitted(values)),
    reset: () => {
      form.reset(KIT_FORM_DEFAULTS);
      setSubmitted(null);
    },
  };
}
