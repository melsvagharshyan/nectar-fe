import { ButtonShowcase } from "./components/ButtonShowcase";
import { CardShowcase } from "./components/CardShowcase";
import { ColorPalette } from "./components/ColorPalette";
import { DataDisplayShowcase } from "./components/DataDisplayShowcase";
import { FormShowcase } from "./components/FormShowcase";
import { KitHeader } from "./components/KitHeader";
import { KitSection } from "./components/KitSection";
import { OverlayShowcase } from "./components/OverlayShowcase";
import { ThemePreview } from "./components/ThemePreview";
import { TypographyScale } from "./components/TypographyScale";
import { KIT_BODY, KIT_GRID_2, KIT_PAGE } from "./utils/styles";

export function UiKit() {
  return (
    <div className={KIT_PAGE}>
      <KitHeader />
      <div className={KIT_BODY}>
        <div className="flex flex-col gap-6">
          <h1 className="text-[30px] tracking-[-0.8px]">Nectar UI Kit</h1>
          <p className="max-w-640 text-muted">
            Токены, компоненты и паттерны интерфейса. Все цвета — CSS-переменные,
            поэтому каждый компонент работает в светлой и тёмной теме.
          </p>
        </div>
        <KitSection id="colors" title="Цвета" description="Семантические токены: page, surface, ink, accent и статусы.">
          <ColorPalette />
        </KitSection>
        <KitSection id="typography" title="Типографика" description="Inter Variable, базовый размер 14px.">
          <TypographyScale />
        </KitSection>
        <KitSection id="buttons" title="Кнопки" description="Один компонент Button с вариантами и состояниями.">
          <ButtonShowcase />
        </KitSection>
        <KitSection id="forms" title="Формы" description="Ant Design Input, Select, TextArea и Checkbox на React Hook Form с Zod-схемой.">
          <FormShowcase />
        </KitSection>
        <KitSection id="data" title="Данные" description="Табы, поиск, статусы, аватары, счётчики и пустые состояния.">
          <DataDisplayShowcase />
        </KitSection>
        <KitSection id="cards" title="Карточки объектов" description="PropertyCard в вариантах подбора и каталога.">
          <CardShowcase />
        </KitSection>
        <KitSection id="overlays" title="Панели и диалоги" description="Overlay: боковая панель и модальный диалог.">
          <OverlayShowcase />
        </KitSection>
        <KitSection id="themes" title="Темы" description="Одни и те же компоненты в светлой и тёмной теме одновременно.">
          <div className={KIT_GRID_2}>
            <ThemePreview theme="light" />
            <ThemePreview theme="dark" />
          </div>
        </KitSection>
      </div>
    </div>
  );
}
