import type { PropertyCardData } from "../../../components/property-card";
import { Badge } from "../../../components/ui";
import { cn, money } from "../../../utils/helpers";
import { DETAILS_GRID, DETAIL_PRICE, ROW } from "../../../utils/styles";

export function PropertySummary({ property }: { property: PropertyCardData }) {
  return (
    <>
      <div className={cn(ROW, "justify-between")}>
        <div>
          <h2>{property.title}</h2>
          <p className="text-muted">{property.district} · Ереван</p>
        </div>
        <Badge value={property.availability} />
      </div>
      <div className={cn(ROW, "justify-between mt-20")}>
        <strong className={DETAIL_PRICE}>{money(property.price)}</strong>
        <span>{money(property.price / property.area)} / м²</span>
      </div>
      <dl className={DETAILS_GRID}>
        <div>
          <dt>Площадь</dt>
          <dd>{property.area} м²</dd>
        </div>
        <div>
          <dt>Тип</dt>
          <dd>{property.type}</dd>
        </div>
        {property.type !== "Участок" && (
          <>
            <div>
              <dt>Комнаты</dt>
              <dd>{property.rooms || "—"}</dd>
            </div>
            <div>
              <dt>Этаж</dt>
              <dd>
                {property.floor || "—"} / {property.floors || "—"}
              </dd>
            </div>
          </>
        )}
      </dl>
      <p>{property.description}</p>
    </>
  );
}
