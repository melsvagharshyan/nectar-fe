import { PageHead } from "../../components/PageHead";
import { Tabs } from "../../components/ui";
import { PartnerOffersTable } from "./components/PartnerOffersTable";
import { PARTNER_OFFER_TABS } from "./utils/constants";
import { usePartnerOffers } from "./utils/hooks";
import { PAGE } from "../../utils/styles";

export function PartnerOffers() {
  const { filter, setFilter, offers, propertyOf, resultOf } =
    usePartnerOffers();
  return (
    <div className={PAGE}>
      <PageHead
        title="Предложения"
        subtitle="Предложения вашей компании и результаты подбора"
      />
      <Tabs items={PARTNER_OFFER_TABS} value={filter} onChange={setFilter} />
      <PartnerOffersTable offers={offers} propertyOf={propertyOf} resultOf={resultOf} />
    </div>
  );
}
