import type { DemoState } from "../../../demo/types";
import {
  companyOfferCount,
  companyRequestCount,
} from "../../../utils/helpers";
import { BOX, RECORD } from "../../../utils/styles";

export function CompanyActivity({ state }: { state: DemoState }) {
  return (
    <div className={BOX}>
      <h2>Активность компаний</h2>
      {state.companies.map((c) => {
        const rf = c.kind === "rf";
        return (
          <div className={RECORD} key={c.id}>
            <span>{c.name}</span>
            <span>
              {rf
                ? companyRequestCount(state, c.id)
                : companyOfferCount(state, c.id)}{" "}
              {rf ? "запросов" : "предложений"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
