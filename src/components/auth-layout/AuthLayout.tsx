import type { ReactNode } from "react";
import { cn } from "../../utils/helpers";
import { Logo, LogoMark, ThemeToggle } from "../ui";
import { AuthHero } from "./AuthHero";
import { AUTH_FORM_CARD, AUTH_PAGE_BACKGROUND, AUTH_THEME_TOGGLE } from "./constants";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid min-h-full gap-16 p-16 lg:h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-xs:p-0",
        AUTH_PAGE_BACKGROUND,
      )}
    >
      <AuthHero />
      <main className="relative flex min-h-0 flex-col overflow-y-auto px-24 py-24 max-xs:px-16">
        <div className="flex items-center justify-between lg:justify-end">
          <Logo className="lg:hidden" />
          <ThemeToggle className={AUTH_THEME_TOGGLE} />
        </div>
        <div className="m-auto w-full max-w-[460px] py-24">
          <div className={AUTH_FORM_CARD}>
            <LogoMark className="mx-auto mb-16 size-44 max-lg:hidden" />
            <h1 className="text-center text-[28px] tracking-[-0.8px] max-xs:text-[24px]">{title}</h1>
            <p className="mt-8 mb-24 text-center text-[14px] text-muted">{subtitle}</p>
            {children}
          </div>
          <div className="mt-20 text-center text-[13px] text-muted">{footer}</div>
        </div>
      </main>
    </div>
  );
}
