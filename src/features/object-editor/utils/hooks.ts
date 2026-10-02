import { useMemo, useRef, useState } from "react";
import {
  useForm,
  useWatch,
  type FieldErrors,
  type Resolver,
  type UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "../../../api/errors";
import {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useUploadImageMutation,
} from "../../../api/records-api-ts/recordsApi";
import { useDemo } from "../../../app/DemoProvider";
import { roleFromHash } from "../../../utils/helpers";
import { useDirtyClose } from "../../../utils/hooks";
import { SAVED_MESSAGES } from "./constants";
import {
  buildPreview,
  buildPropertyDefaults,
  isEditorUnavailable,
  toPropertyPayload,
} from "./helpers";
import type { EditorTab, ObjectEditorProps, PropertyFormValues } from "./types";
import { createPropertySchema } from "./validations";

/** Uploads picked images one by one and appends their URLs to `media`. */
function useMediaUpload(form: UseFormReturn<PropertyFormValues>) {
  const [uploadImage] = useUploadImageMutation();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>();

  const upload = async (files: File[]) => {
    setUploading(true);
    setUploadError(undefined);
    for (const file of files) {
      const result = await uploadImage(file);
      if (result.error) {
        setUploadError(getApiErrorMessage(result.error));
        break;
      }
      form.setValue("media", [...form.getValues("media"), result.data.url], {
        shouldDirty: true,
        shouldValidate: form.formState.isSubmitted,
      });
    }
    setUploading(false);
  };

  return { upload, uploading, uploadError };
}

export function useObjectEditor({
  propertyId,
  onClose,
  onSuccess,
}: ObjectEditorProps) {
  const [state] = useDemo();
  const role = roleFromHash();
  const property = state.properties.find((p) => p.id === propertyId);
  const [defaultValues] = useState(() => buildPropertyDefaults(property));
  const publishRef = useRef(false);
  const resolvers = useMemo(
    () => ({
      draft: zodResolver(createPropertySchema(false)),
      publish: zodResolver(createPropertySchema(true)),
    }),
    [],
  );
  const resolver: Resolver<PropertyFormValues> = (values, context, options) =>
    (publishRef.current ? resolvers.publish : resolvers.draft)(
      values,
      context,
      options,
    );

  const form = useForm<PropertyFormValues>({
    defaultValues,
    resolver,
    shouldFocusError: false,
  });
  const watched = useWatch({ control: form.control });
  const values: PropertyFormValues = { ...defaultValues, ...watched };
  const dirtyClose = useDirtyClose(form.formState.isDirty, onClose);
  const [tab, setTab] = useState<EditorTab>("form");
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const media = useMediaUpload(form);
  const [createProperty] = useCreatePropertyMutation();
  const [updateProperty] = useUpdatePropertyMutation();

  const onValid = async (data: PropertyFormValues) => {
    const publish = publishRef.current;
    const body = toPropertyPayload(data, publish);
    const result = propertyId
      ? await updateProperty({ id: propertyId, body })
      : await createProperty(body);
    if (result.error) {
      form.setError("root.server", { message: getApiErrorMessage(result.error) });
      return;
    }
    dirtyClose.finish();
    onSuccess(publish ? SAVED_MESSAGES.published : SAVED_MESSAGES.draft);
    onClose();
  };
  const onInvalid = (errors: FieldErrors<PropertyFormValues>) => {
    setTab("form");
    const first = Object.keys(errors)[0] as keyof PropertyFormValues | undefined;
    if (first) requestAnimationFrame(() => form.setFocus(first));
  };
  const submit = (publish: boolean) => {
    publishRef.current = publish;
    return form.handleSubmit(onValid, onInvalid)();
  };

  return {
    form,
    property,
    preview: buildPreview(values, property),
    type: values.type,
    unavailable: isEditorUnavailable(role, propertyId, property),
    readonly: property?.availability === "sold",
    saving: form.formState.isSubmitting,
    serverError: form.formState.errors.root?.server?.message,
    media,
    dirtyClose,
    tab,
    setTab,
    isPreviewOpen,
    setPreviewOpen,
    saveDraft: () => submit(false),
    publish: () => submit(true),
  };
}
