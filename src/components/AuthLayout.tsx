import type { ReactNode } from "react";
import { Logo, ThemeToggle } from "./ui";

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
    <div className="m-auto flex min-h-full max-w-[520px] flex-col justify-center px-24 py-48 max-xs:px-16 max-xs:py-28">
      <div className="flex items-center justify-between">
        <Logo />
        <ThemeToggle />
      </div>
      <div className="mt-28 rounded-[18px] border border-line bg-surface p-32 shadow-card max-xs:p-20">
        <h1 className="text-[26px] tracking-[-0.6px] max-xs:text-[22px]">{title}</h1>
        <p className="mt-8 mb-24 text-[13px] text-muted">{subtitle}</p>
        {children}
      </div>
      <div className="mt-18 text-center text-[13px] text-muted">{footer}</div>
    </div>
  );
}
