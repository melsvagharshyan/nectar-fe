import { Icon } from "../../components/ui";

export function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div
      className="fixed bottom-26 left-1/2 z-160 flex max-w-[90%] -translate-x-1/2 items-center gap-10 rounded-[12px] bg-contrast px-18 py-13 text-[13px] font-medium text-on-contrast shadow-raised"
      role="status"
    >
      <span className="flex size-22 items-center justify-center rounded-full bg-success text-white dark:text-[#052e16]">
        <Icon name="check" className="size-14" />
      </span>
      {message}
    </div>
  );
}
