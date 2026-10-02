import { navigate } from "../../app/router";
import { MobileSteps } from "../../components/MobileSteps";
import { Button, Empty } from "../../components/ui";
import { WORKSPACE_CONTAINER } from "../../utils/styles";
import { PartnerRequestsColumn } from "./components/PartnerRequestsColumn";
import { PropertyBaseColumn } from "./components/PropertyBaseColumn";
import { SelectionColumn } from "./components/SelectionColumn";
import { PARTNER_STEPS } from "./utils/constants";
import { usePartnerWorkspace } from "./utils/hooks";
import { GRID } from "./utils/styles";

export function PartnerWorkspace() {
  const model = usePartnerWorkspace();
  if (model.unavailable)
    return (
      <Empty text="Запись недоступна">
        <Button onClick={() => navigate("/partner/requests")}>К запросам</Button>
      </Empty>
    );
  return (
    <div className={WORKSPACE_CONTAINER}>
      <MobileSteps
        steps={PARTNER_STEPS}
        value={model.step}
        onChange={model.setStep}
      />
      <div className={GRID} data-step={model.step}>
        <PartnerRequestsColumn model={model} />
        <SelectionColumn model={model} />
        <PropertyBaseColumn model={model} />
      </div>
    </div>
  );
}
