import { cn } from "../../../utils/helpers";
import { COLOR_GROUPS } from "../utils/constants";
import { KIT_LABEL } from "../utils/styles";

export function ColorPalette() {
  return (
    <div className="flex flex-col gap-22">
      {COLOR_GROUPS.map((group) => (
        <div key={group.title}>
          <span className={KIT_LABEL}>{group.title}</span>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-12">
            {group.tokens.map((token) => (
              <div
                key={token.name}
                className="overflow-hidden rounded-[14px] border border-line bg-surface"
              >
                <div className={cn("h-64 border-b border-line", token.swatch)} />
                <div className="px-12 py-10">
                  <strong className="block text-[13px] font-semibold">{token.name}</strong>
                  <code className="font-code text-[11px] text-faint">{token.variable}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
