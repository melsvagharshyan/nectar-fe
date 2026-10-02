import { FormProvider } from "react-hook-form";
import { CloseConfirmation } from "../../components/form";
import { PropertyCard } from "../../components/property-card";
import { EditorForm } from "./components/EditorForm";
import { EditorFrame } from "./components/EditorFrame";
import { EditorTabs } from "./components/EditorTabs";
import { PreviewDialog } from "./components/PreviewDialog";
import { PREVIEW_CARD, PREVIEW_CARD_EMBEDDED } from "./utils/constants";
import { editorTitle } from "./utils/helpers";
import { useObjectEditor } from "./utils/hooks";
import { EMBEDDED_NOTICE, LAYOUT, PREVIEW } from "./utils/styles";
import type { ObjectEditorProps } from "./utils/types";
import { NOTICE } from "../../utils/styles";
import { cn } from "../../utils/helpers";

export { EDITOR_PAGE } from "./utils/styles";

export function ObjectEditor(props: ObjectEditorProps) {
  const { propertyId, embedded = false } = props;
  const editor = useObjectEditor(props);
  const { form, preview, dirtyClose, readonly } = editor;
  const context = embedded ? "embedded" : "overlay";

  return (
    <>
      <EditorFrame
        title={editorTitle(propertyId)}
        embedded={embedded}
        flush={!editor.unavailable}
        onClose={dirtyClose.close}
      >
        {editor.unavailable ? (
          <p className={NOTICE}>Запись недоступна.</p>
        ) : (
          <>
            {readonly && (
              <p className={cn(NOTICE, embedded && EMBEDDED_NOTICE)}>
                Объект продан. Доступен только просмотр.
              </p>
            )}
            <EditorTabs
              value={editor.tab}
              embedded={embedded}
              onChange={editor.setTab}
            />
            <div className={LAYOUT[context]}>
              <aside
                className={cn(
                  PREVIEW[context],
                  editor.tab === "form" && "max-md:hidden",
                )}
              >
                <PropertyCard
                  property={preview}
                  variant="compact"
                  context="editor"
                  className={embedded ? PREVIEW_CARD_EMBEDDED : PREVIEW_CARD}
                  onOpen={() => editor.setPreviewOpen(true)}
                />
              </aside>
              <FormProvider {...form}>
                <EditorForm
                  type={editor.type}
                  price={preview.price}
                  area={preview.area}
                  readonly={readonly}
                  embedded={embedded}
                  mobileHidden={editor.tab === "preview"}
                  saving={editor.saving}
                  serverError={editor.serverError}
                  media={editor.media}
                  onSaveDraft={editor.saveDraft}
                  onPublish={editor.publish}
                  onClose={dirtyClose.close}
                />
              </FormProvider>
            </div>
          </>
        )}
      </EditorFrame>
      {editor.isPreviewOpen && (
        <PreviewDialog
          preview={preview}
          onClose={() => editor.setPreviewOpen(false)}
        />
      )}
      {dirtyClose.isConfirmOpen && (
        <CloseConfirmation onStay={dirtyClose.stay} onClose={dirtyClose.leave} />
      )}
    </>
  );
}
