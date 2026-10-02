import { useState } from "react";
import { Button, Overlay, OverlayFooter } from "../../../components/ui";
import { BOX, NOTICE, RECORD } from "../../../utils/styles";
import type { KitOverlay } from "../utils/types";
import { KIT_GRID_2, KIT_ROW } from "../utils/styles";

export function OverlayShowcase() {
  const [open, setOpen] = useState<KitOverlay>(null);
  const close = () => setOpen(null);
  return (
    <div className={KIT_GRID_2}>
      <div className="flex flex-col gap-14">
        <div className={KIT_ROW}>
          <Button variant="contrast" onClick={() => setOpen("drawer")}>
            Открыть панель
          </Button>
          <Button onClick={() => setOpen("modal")}>Открыть диалог</Button>
        </div>
        <p className={NOTICE}>
          Панели открываются справа, диалоги по центру. Escape и клик по фону
          закрывают их, фокус остаётся внутри.
        </p>
      </div>
      <div className={BOX}>
        <h2>Уведомления</h2>
        <div className={RECORD}>
          <div>
            <strong>Новое предложение · CR-4589</strong>
            <p>Партнёр добавил объект BR-5120</p>
          </div>
          <Button className="text-[12px]">Открыть</Button>
        </div>
        <div className={RECORD}>
          <div>
            <strong>Передача в CRM · TR-004</strong>
            <p>Демопередача выполнена</p>
          </div>
          <Button className="text-[12px]">Открыть</Button>
        </div>
      </div>
      {open === "drawer" && (
        <Overlay title="Параметры запроса" onClose={close}>
          <p className="text-muted">
            Содержимое панели прокручивается, заголовок закреплён.
          </p>
        </Overlay>
      )}
      {open === "modal" && (
        <Overlay title="Сбросить демо?" modal onClose={close}>
          <p>Все изменения демосценария будут удалены.</p>
          <OverlayFooter>
            <Button onClick={close}>Отмена</Button>
            <Button variant="primary" onClick={close}>
              Сбросить демо
            </Button>
          </OverlayFooter>
        </Overlay>
      )}
    </div>
  );
}
