import { useState } from "react";
import { useDemo } from "../../../app/DemoProvider";
import { navigate, useRoute } from "../../../app/router";
import { toPartnerView } from "../../../demo/projections";
import type { Actor } from "../../../demo/types";
import { currentCompanyId } from "../../../utils/helpers";
import { useFilterForm } from "../../../utils/hooks";
import { DEFAULT_PARTNER_FILTERS, RESET_PARTNER_FILTERS } from "./constants";
import {
  availableProperties,
  filterPartnerRequests,
  isOpenForOffers,
} from "./helpers";
import type { PropertyBaseView } from "./types";

export function usePartnerWorkspace() {
  const [state, dispatch] = useDemo();
  const data = toPartnerView(state, currentCompanyId());
  const route = useRoute();
  const actor: Actor = {
    role: "partner",
    companyId: currentCompanyId(),
  };
  const filterForm = useFilterForm(DEFAULT_PARTNER_FILTERS);
  const [matching, setMatching] = useState(false);
  const [step, setStep] = useState(0);
  const [view, setView] = useState<PropertyBaseView>("grid");

  const requests = filterPartnerRequests(data, filterForm.values);
  const requestedId = route.params.get("request");
  const request = requests.find((r) => r.id === requestedId) || requests[0];
  const draft = request ? data.drafts[request.id] || [] : [];

  const toggleDraft = (propertyId: string) =>
    request &&
    dispatch({
      type: "DRAFT_TOGGLE",
      actor,
      requestId: request.id,
      propertyId,
    });

  return {
    data,
    unavailable:
      !!requestedId && !data.requests.some((r) => r.id === requestedId),
    filterForm,
    resetFilters: () => filterForm.reset(RESET_PARTNER_FILTERS),
    matching,
    setMatching,
    step,
    setStep,
    view,
    setView,
    requests,
    request,
    draft,
    properties: availableProperties(data, matching, request),
    locked: !isOpenForOffers(request),
    toggleDraft,
    isOffered: (propertyId: string) =>
      data.offers.some(
        (o) => o.requestId === request?.id && o.propertyId === propertyId,
      ),
    selectRequest: (requestId: string) => {
      navigate("/partner/requests", { request: requestId });
      setStep(1);
    },
  };
}

export type PartnerWorkspaceModel = ReturnType<typeof usePartnerWorkspace>;
