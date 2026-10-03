import type { ReactNode } from "react";
import { asset, cn, coverImage } from "../../utils/helpers";
import { FALLBACK_IMAGE } from "../../utils/constants";
import { Button, Icon } from "../ui";
import {
  cardLocation,
  cardTitle,
  compactSpecs,
  detailedSpecs,
  formatCardPrice,
  formatCardPricePerArea,
} from "./helpers";
import { PropertyTags } from "./PropertyTags";
import { cardStyles } from "./styles";
import type {
  PropertyCardContext,
  PropertyCardData,
  PropertyCardVariant,
} from "./types";

export function PropertyCard({
  property: p,
  variant = "immersive",
  context = "default",
  className,
  actions,
  score,
  date,
  selected,
  onSelect,
  onDeal,
  onOpen,
}: {
  property: PropertyCardData;
  variant?: PropertyCardVariant;
  context?: PropertyCardContext;
  className?: string;
  actions?: ReactNode;
  score?: number;
  date?: string;
  selected?: boolean;
  onSelect?: () => void;
  onDeal?: () => void;
  onOpen: () => void;
}) {
  const styles = cardStyles(variant, context);
  const specs = variant === "immersive" ? detailedSpecs(p) : compactSpecs(p);
  return (
    <article className={cn(styles.article, className)} data-property={p.id}>
      <div className={styles.media}>
        <Button
          className="photo-button absolute inset-0 size-full rounded-none border-0 bg-transparent p-0 hover:not-disabled:bg-transparent"
          aria-label={"Подробнее " + p.id}
          onClick={onOpen}
        >
          <img
            className="size-full object-cover [transition:transform_0.4s] group-hover/card:[transform:scale(1.03)]"
            src={coverImage(p.media)}
            alt={p.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = asset(FALLBACK_IMAGE);
            }}
          />
        </Button>
        <PropertyTags
          styles={styles}
          property={p}
          score={score}
          date={date}
          selected={selected}
          onSelect={onSelect}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.priceRow}>
          <h3 className={styles.price}>{formatCardPrice(p, variant)}</h3>
          <span className={styles.pricePerArea}>
            {formatCardPricePerArea(p, variant)}
          </span>
        </div>
        <h4 className={styles.title}>{cardTitle(p)}</h4>
        <div className={styles.location}>
          <Icon name="pin" />
          <span className="min-w-0 truncate">{cardLocation(p)}</span>
          <span className={styles.publicId}>ID {p.id.replace("BR-", "")}</span>
        </div>
        {specs.length > 0 && (
          <div className={styles.specs}>
            {specs.map((spec) => (
              <span key={spec.label} className={styles.spec}>
                <span className={styles.specLabel}>{spec.label}</span>{" "}
                <b className={styles.specValue}>{spec.value}</b>
              </span>
            ))}
          </div>
        )}
        {p.description && (
          <p className={styles.description}>
            <u>Заметка агента:</u> {p.description}
          </p>
        )}
        {(variant === "immersive" || actions) && (
          <div className={styles.actions}>
            {variant === "immersive" && (
              <Button variant="primary" onClick={onDeal || onOpen}>
                <Icon name="deal" />
                Сделка
              </Button>
            )}
            {actions}
          </div>
        )}
      </div>
    </article>
  );
}
