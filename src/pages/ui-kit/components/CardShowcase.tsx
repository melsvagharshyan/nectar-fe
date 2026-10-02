import { useState } from "react";
import { PropertyCard } from "../../../components/property-card";
import { Button, Icon } from "../../../components/ui";
import { SAMPLE_PROPERTY, SAMPLE_PROPERTY_ALT } from "../utils/constants";
import { KIT_LABEL } from "../utils/styles";

const noop = () => undefined;

export function CardShowcase() {
  const [selected, setSelected] = useState(false);
  return (
    <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)] items-start gap-20 max-xl:grid-cols-2 max-md:grid-cols-1">
      <div>
        <span className={KIT_LABEL}>Карточка подбора</span>
        <PropertyCard
          property={SAMPLE_PROPERTY}
          score={92}
          date="2026-09-03"
          selected={selected}
          onSelect={() => setSelected((v) => !v)}
          onOpen={noop}
          actions={
            <>
              <Button>
                <Icon name="close" />
                Отказ
              </Button>
              <Button
                selected={selected}
                aria-pressed={selected}
                onClick={() => setSelected((v) => !v)}
              >
                <Icon name={selected ? "check" : "bookmark"} />
                Бронь
              </Button>
            </>
          }
        />
      </div>
      <div>
        <span className={KIT_LABEL}>Каталог</span>
        <PropertyCard property={SAMPLE_PROPERTY} variant="compact" onOpen={noop} />
      </div>
      <div>
        <span className={KIT_LABEL}>Каталог · с действием</span>
        <PropertyCard
          property={SAMPLE_PROPERTY_ALT}
          variant="compact"
          onOpen={noop}
          actions={
            <Button>
              <Icon name="edit" />
              Редактировать
            </Button>
          }
        />
      </div>
    </div>
  );
}
