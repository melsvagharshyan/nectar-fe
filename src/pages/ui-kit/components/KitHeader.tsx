import { navigate } from "../../../app/router";
import { Button, Icon, Logo, ThemeToggle } from "../../../components/ui";
import { KIT_SECTIONS } from "../utils/constants";
import { scrollToSection } from "../utils/helpers";
import { KIT_HEADER, KIT_NAV } from "../utils/styles";

export function KitHeader() {
  return (
    <header className={KIT_HEADER}>
      <Logo />
      <span className="rounded-full bg-nav-raised px-10 py-4 text-[11px] font-semibold text-accent">
        UI Kit
      </span>
      <nav className={KIT_NAV} aria-label="Разделы UI kit">
        {KIT_SECTIONS.map((section) => (
          <a
            key={section.id}
            href="#/ui-kit"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(section.id);
            }}
          >
            {section.label}
          </a>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-6">
        <ThemeToggle className="rounded-[10px] text-nav-text hover:not-disabled:bg-nav-raised hover:not-disabled:text-white" />
        <Button
          variant="primary"
          className="py-7 text-[12px]"
          onClick={() => navigate("/")}
        >
          Открыть кабинет
          <Icon name="arrow" className="size-14" />
        </Button>
      </div>
    </header>
  );
}
