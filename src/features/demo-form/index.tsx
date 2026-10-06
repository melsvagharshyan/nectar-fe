import { FormProvider, useWatch } from "react-hook-form";
import { CloseConfirmation } from "../../components/form";
import { Button, Overlay, OverlayFooter } from "../../components/ui";
import { ClientFields } from "./components/ClientFields";
import { CompanyFields } from "./components/CompanyFields";
import { DistrictMapDialog } from "./components/DistrictMapDialog";
import { EmployeeFields } from "./components/EmployeeFields";
import { RequestFields } from "./components/RequestFields";
import { DEMO_FORM_ID, KIND_TITLES } from "./utils/constants";
import { useDemoForm } from "./utils/hooks";
import type { DemoFormProps } from "./utils/types";
import { FORM, NOTICE } from "../../utils/styles";

export type { DemoFormKind } from "./utils/types";

export function DemoForm(props: DemoFormProps) {
  const { kind, id } = props;
  const { form, records, reReview, dirtyClose, submit, isMapOpen, setMapOpen } =
    useDemoForm(props);
  const districts = useWatch({ control: form.control, name: "districts" });
  const { isSubmitting, isDirty } = form.formState;

  return (
    <>
      <Overlay
        title={`${id ? "Изменение" : "Создание"} ${KIND_TITLES[kind]}`}
        onClose={dirtyClose.close}
      >
        {records.unavailable ? (
          <p className={NOTICE}>Запись недоступна.</p>
        ) : (
          <FormProvider {...form}>
            <form id={DEMO_FORM_ID} className={FORM} onSubmit={submit} noValidate>
              {reReview && (
                <p className={NOTICE}>
                  После сохранения запрос снова уйдёт на проверку администратору.
                  До одобрения партнёры его не увидят, а бронирование
                  предложений будет недоступно.
                </p>
              )}
              {kind === "client" ? (
                <ClientFields staff={records.staff} />
              ) : kind === "request" ? (
                <RequestFields
                  client={records.requestClient}
                  onOpenMap={() => setMapOpen(true)}
                />
              ) : kind === "company" ? (
                <CompanyFields isNew={!id} />
              ) : (
                <EmployeeFields />
              )}
              <OverlayFooter>
                <Button onClick={dirtyClose.close}>Отмена</Button>
                <Button
                  type="submit"
                  form={DEMO_FORM_ID}
                  variant="primary"
                  disabled={isSubmitting || (!!id && !isDirty)}
                >
                  {isSubmitting ? "Сохранение…" : "Сохранить"}
                </Button>
              </OverlayFooter>
            </form>
          </FormProvider>
        )}
      </Overlay>
      {isMapOpen && (
        <DistrictMapDialog
          selected={districts}
          onApply={(value) =>
            form.setValue("districts", value, {
              shouldDirty: true,
              shouldValidate: form.formState.isSubmitted,
            })
          }
          onClose={() => setMapOpen(false)}
        />
      )}
      {dirtyClose.isConfirmOpen && (
        <CloseConfirmation onStay={dirtyClose.stay} onClose={dirtyClose.leave} />
      )}
    </>
  );
}
