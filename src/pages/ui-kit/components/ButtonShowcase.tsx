import { Button, BUTTON_VARIANTS, Icon } from "../../../components/ui";
import { KIT_LABEL, KIT_ROW } from "../utils/styles";

export function ButtonShowcase() {
  return (
    <div className="flex flex-col gap-22">
      <div>
        <span className={KIT_LABEL}>Варианты</span>
        <div className={KIT_ROW}>
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <span className={KIT_LABEL}>Состояния</span>
        <div className={KIT_ROW}>
          <Button variant="primary">
            <Icon name="plus" className="size-15" />
            С иконкой
          </Button>
          <Button selected aria-pressed>
            <Icon name="check" className="size-15" />
            Выбрано
          </Button>
          <Button variant="tab" active>
            Активный таб
          </Button>
          <Button variant="primary" disabled>
            Недоступно
          </Button>
          <Button iconOnly aria-label="Избранное">
            <Icon name="heart" />
          </Button>
          <Button iconOnly variant="secondary" aria-label="Поделиться">
            <Icon name="share" />
          </Button>
        </div>
      </div>
      <div>
        <span className={KIT_LABEL}>Действия карточки</span>
        <div className="grid max-w-420 grid-cols-2 gap-8">
          <Button>
            <Icon name="close" className="size-15" />
            Отказ
          </Button>
          <Button>
            <Icon name="bookmark" className="size-15" />
            Бронь
          </Button>
          <Button variant="primary" className="col-span-2">
            <Icon name="deal" className="size-15" />
            Сделка
          </Button>
        </div>
      </div>
    </div>
  );
}
