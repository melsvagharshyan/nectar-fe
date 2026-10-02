import { panel } from "../../../app/router";
import { PropertyCard } from "../../../components/property-card";
import { Button, Icon } from "../../../components/ui";
import { offerPresentation } from "../../../demo/selectors";
import type { Offer, Request } from "../../../demo/types";
import type { WorkspaceModel } from "../utils/hooks";

export function OfferCard({
  model: m,
  offer: o,
  request,
}: {
  model: WorkspaceModel;
  offer: Offer;
  request: Request;
}) {
  const { state, dispatch, actor, editable } = m;
  const p = m.data.properties.find((x) => x.id === o.propertyId)!;
  const presentation = offerPresentation(state, o, actor);
  const rejected = o.disposition === "rejected";
  const toggleInterest = () =>
    dispatch({ type: "INTEREST", actor, offerId: o.id });
  const openTransfer = () => {
    if (presentation.canSelect)
      dispatch({ type: "INTEREST", actor, offerId: o.id, selected: true });
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
              onClick={() =>
                dispatch({
                  type: rejected ? "RESTORE" : "REJECT",
                  actor,
                  offerId: o.id,
                })
              }
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
