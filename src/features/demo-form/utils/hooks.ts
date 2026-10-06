import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetDistrictStatsQuery } from "../../../api/analytics-api-ts/analyticsApi";
import { getApiErrorMessage } from "../../../api/errors";
import {
  useCreateClientMutation,
  useCreateCompanyMutation,
  useCreateEmployeeMutation,
  useCreateRequestMutation,
  useUpdateClientMutation,
  useUpdateCompanyMutation,
  useUpdateEmployeeMutation,
  useUpdateRequestMutation,
} from "../../../api/records-api-ts/recordsApi";
import { useDemo } from "../../../app/DemoProvider";
import { notify } from "../../../components/toaster";
import {
  OPEN_REQUEST_STAGES,
  TYPES_WITHOUT_ROOMS,
} from "../../../utils/constants";
import { roleFromHash } from "../../../utils/helpers";
import { useDirtyClose } from "../../../utils/hooks";
import { SAVED_MESSAGES } from "./constants";
import {
  buildDemoFormDefaults,
  resolveDemoFormRecords,
  toClientPayload,
  toCompanyPayload,
  toEmployeePayload,
  toRequestPayload,
} from "./helpers";
import type { DemoFormProps, DemoFormRecords, DemoFormValues } from "./types";
import { createDemoFormSchema } from "./validations";

/** Persists a record form; resolves to an error message on failure. */
function useSaveRecord({ kind, id }: DemoFormProps, records: DemoFormRecords) {
  const [createClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [createRequest] = useCreateRequestMutation();
  const [updateRequest] = useUpdateRequestMutation();
  const [createCompany] = useCreateCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();

  return async (values: DemoFormValues): Promise<string | undefined> => {
    const call = () => {
      switch (kind) {
        case "client": {
          const body = toClientPayload(values);
          return id ? updateClient({ id, body }) : createClient(body);
        }
        case "request": {
          const body = toRequestPayload(
            values,
            !TYPES_WITHOUT_ROOMS.includes(values.type),
          );
          return id
            ? updateRequest({ id, body })
            : createRequest({ id: records.requestClient?.id ?? "", body });
        }
        case "company": {
          const body = toCompanyPayload(values);
          return id ? updateCompany({ id, body }) : createCompany(body);
        }
        case "employee": {
          const body = toEmployeePayload(values);
          return id
            ? updateEmployee({ id, body })
            : createEmployee({ id: records.company, body });
        }
      }
    };
    const result = await call();
    return result.error ? getApiErrorMessage(result.error) : undefined;
  };
}

export const useDistrictStats = () => useGetDistrictStatsQuery().data ?? {};

export function useDemoForm(props: DemoFormProps) {
  const { kind, id, onClose, onSuccess } = props;
  const [state] = useDemo();
  const [records] = useState(() =>
    resolveDemoFormRecords(state, props, roleFromHash()),
  );
  const schema = useMemo(
    () =>
      createDemoFormSchema(
        kind,
        records.staff.map((s) => s.id),
      ),
    [kind, records],
  );
  const form = useForm<DemoFormValues>({
    defaultValues: buildDemoFormDefaults(kind, records),
    resolver: zodResolver(schema),
  });
  const dirtyClose = useDirtyClose(form.formState.isDirty, onClose);
  const [isMapOpen, setMapOpen] = useState(false);
  const save = useSaveRecord(props, records);
  // The server sends a broker's edit of an approved request back to admin review.
  const reReview =
    roleFromHash() === "broker" &&
    !!records.request &&
    OPEN_REQUEST_STAGES.includes(records.request.stage);

  const submit = form.handleSubmit(async (values) => {
    const error = await save(values);
    if (error) {
      notify.error(id ? "Не удалось сохранить изменения" : "Не удалось создать запись", {
        description: error,
      });
      return;
    }
    dirtyClose.finish();
    onSuccess(
      reReview
        ? "Запрос обновлён и отправлен на проверку"
        : SAVED_MESSAGES[kind][id ? 1 : 0],
    );
    onClose();
  });

  return { form, records, reReview, dirtyClose, submit, isMapOpen, setMapOpen };
}
