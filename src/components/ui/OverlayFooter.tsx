import { useContext, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { OverlayFooterContext } from "./overlayContext";

/**
 * Renders into the parent Overlay's pinned footer, outside the scrolling body.
 * Submit buttons rendered here are outside their <form> in the DOM, so they
 * need the `form` attribute.
 */
export function OverlayFooter({ children }: { children: ReactNode }) {
  const slot = useContext(OverlayFooterContext);
  return slot ? createPortal(children, slot) : null;
}
