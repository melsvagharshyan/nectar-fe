import { panel } from "../../../app/router";
import type { Role } from "../../../demo/types";
import { PropertyCard } from "../../../components/property-card";
import { Button, Icon } from "../../../components/ui";
import { openPropertyEditor } from "../../../utils/navigation";
import type { CatalogProperty } from "../utils/types";
import { CATALOG_GRID } from "../utils/styles";

export function CatalogGrid({
  role,
  properties,
}: {
  role: Role;
  properties: CatalogProperty[];
}) {
  return (
    <div className={CATALOG_GRID}>
      {properties.map((p) => (
        <PropertyCard
          key={p.id}
          property={p}
          variant="compact"
          onOpen={() => panel("property", { object: p.id })}
          actions={
            role !== "broker" && p.availability !== "sold" ? (
              <Button onClick={() => openPropertyEditor(role, p.id)}>
                <Icon name="edit" />
                Редактировать
              </Button>
            ) : undefined
          }
        />
      ))}
    </div>
  );
}
