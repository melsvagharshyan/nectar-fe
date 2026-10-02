import { useState } from "react";
import { closePanel } from "../../../app/router";
import { offerPresentation } from "../../../demo/selectors";
import { Button, Overlay, OverlayFooter } from "../../../components/ui";
import { openPropertyEditor } from "../../../utils/navigation";
import { companyNameOf } from "../utils/helpers";
import { usePanelContext } from "../utils/hooks";
import type { PanelProps } from "../utils/types";
import { DeniedNotice } from "./DeniedNotice";
import { OfferStatusList } from "./OfferStatusList";
import { PropertyGallery } from "./PropertyGallery";
import { PropertyPhotos } from "./PropertyPhotos";
import { PropertySummary } from "./PropertySummary";
import { BOX } from "../../../utils/styles";
import { cn, currentCompanyId } from "../../../utils/helpers";

export function PropertyPanel({ role }: Pick<PanelProps, "role">) {
  const { state, projected, actor, params, goToRequest } = usePanelContext(role);
  const [photo, setPhoto] = useState(0);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const property = projected.properties.find((p) => p.id === params.objectId);
  const privateProperty =
    role === "broker"
      ? undefined
      : state.properties.find(
          (p) =>
            p.id === params.objectId &&
            (role === "admin" || p.companyId === currentCompanyId()),
        );
  const offerItems = property
    ? projected.offers
        .filter((o) => o.propertyId === property.id)
        .map((o) => ({
          id: o.id,
          linkLabel: o.requestId,
          status: offerPresentation(
            state,
            state.offers.find((x) => x.id === o.id)!,
            actor,
          ).label,
          onOpen: () => goToRequest(o.requestId),
        }))
    : [];
  const canEdit = !!privateProperty && privateProperty.availability !== "sold";

  return (
    <>
      <Overlay
        title={property ? `Объект ${property.id}` : "Объект"}
        onClose={closePanel}
        wide
      >
        {property ? (
          <>
            <PropertyPhotos
              property={property}
              photo={photo}
              onPhotoChange={setPhoto}
              onOpenGallery={() => setGalleryOpen(true)}
            />
            <PropertySummary property={property} />
            {privateProperty && (
              <div className={cn(BOX, "mt-20")}>
                <h3>Внутренние сведения</h3>
                <p className="text-muted mt-20">{privateProperty.internalAddress}</p>
                <p>{privateProperty.privateNotes}</p>
                {role === "admin" && (
                  <p className="mt-20">
                    {companyNameOf(state, privateProperty.companyId)}
                  </p>
                )}
              </div>
            )}
            {role !== "broker" && (
              <div className={cn(BOX, "mt-20")}>
                <h3>Предложения</h3>
                <OfferStatusList items={offerItems} />
              </div>
            )}
            <OverlayFooter>
              {canEdit && (
                <Button onClick={() => openPropertyEditor(role, property.id)}>
                  Редактировать
                </Button>
              )}
              <Button onClick={closePanel}>Закрыть</Button>
            </OverlayFooter>
          </>
        ) : (
          <DeniedNotice />
        )}
      </Overlay>
      {isGalleryOpen && property && (
        <PropertyGallery
          property={property}
          photo={photo}
          onPhotoChange={setPhoto}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
}
