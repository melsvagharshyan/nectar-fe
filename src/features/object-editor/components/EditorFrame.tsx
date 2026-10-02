import type { ReactNode } from "react";
import { Button, Overlay } from "../../../components/ui";
import { PAGE_HEAD } from "../../../utils/styles";
import { EMBEDDED_HEAD, EMBEDDED_TITLE } from "../utils/styles";

export function EditorFrame({
  children,
  embedded,
  flush,
  title,
  onClose,
}: {
  children: ReactNode;
  embedded?: boolean;
  /** Embedded editor with its layout rendered: the header becomes a toolbar strip. */
  flush: boolean;
  title: string;
  onClose: () => void;
}) {
  return embedded ? (
    <section>
      <div className={flush ? EMBEDDED_HEAD : PAGE_HEAD}>
        <h1 className={flush ? EMBEDDED_TITLE : undefined}>{title}</h1>
        <Button onClick={onClose}>Закрыть редактор</Button>
      </div>
      {children}
    </section>
  ) : (
    <Overlay title={title} wide onClose={onClose}>
      {children}
    </Overlay>
  );
}
