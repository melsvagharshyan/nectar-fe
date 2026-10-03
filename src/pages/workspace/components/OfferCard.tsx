import { panel } from "../../../app/router";
import { PropertyCard } from "../../../components/property-card";
import { Button, Icon } from "../../../components/ui";
import { offerPresentation } from "../../../demo/selectors";
import type { Offer, Request } from "../../../demo/types";
import { useOfferActions, type WorkspaceModel } from "../utils/hooks";

export function OfferCard({
  model: m,
  offer: o,
  request,
}: {
  model: WorkspaceModel;
  offer: Offer;
  request: Request;
}) {
  const { state, actor, editable } = m;
  const p = m.data.properties.find((x) => x.id === o.propertyId)!;
  const presentation = offerPresentation(state, o, actor);
  const rejected = o.disposition === "rejected";
  const { setBooked, setRejected } = useOfferActions(m, o);
  const toggleInterest = () => void setBooked(!presentation.selected);
  const openTransfer = () => {
    if (presentation.canSelect && !presentation.selected) void setBooked(true, false);
    panel("transfer", { request: request.id, client: request.clientId });
  };

  return (
    <PropertyCard
      property={p}
      score={o.matchScore}
      onDeal={editable ? openTransfer : undefined}
      date={o.createdAt}
      selected={presentation.selected}
      onSelect={editable && presentation.canSelect ? toggleInterest : undefined}
      onOpen={() =>
        panel("property", {
          object: p.id,
          client: request.clientId,
          request: request.id,
        })
      }
      actions={
        editable ? (
          <>
            <Button
              disabled={!presentation.canReject}
              onClick={() => void setRejected(!rejected)}
            >
              <Icon name="close" />
              {rejected ? "Вернуть" : "Отказ"}
            </Button>
            <Button
              selected={presentation.selected}
              aria-pressed={presentation.selected}
              disabled={!presentation.canSelect}
              onClick={toggleInterest}
            >
              <Icon name={presentation.selected ? "check" : "bookmark"} />
              Бронь
            </Button>
          </>
        ) : (
          <span className="badge">{presentation.label}</span>
        )
      }
    />
  );
}
