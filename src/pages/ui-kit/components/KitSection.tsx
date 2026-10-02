import type { ReactNode } from "react";
import { KIT_SECTION, KIT_SECTION_HEAD } from "../utils/styles";

export function KitSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={KIT_SECTION}>
      <div className={KIT_SECTION_HEAD}>
        <h2 className="text-[20px] tracking-[-0.3px]">{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}
