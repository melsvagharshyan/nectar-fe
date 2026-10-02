import { useDemo } from "../../../app/DemoProvider";
import { useRoute } from "../../../app/router";
import { useFilterForm } from "../../../utils/hooks";
import { DEFAULT_ADMIN_FILTERS } from "./constants";
import { filterAdminOffers, filterAdminRequests } from "./helpers";

export function useAdminWorkspace() {
  const [state] = useDemo();
  const route = useRoute();
  const view = route.params.get("view") || "";
  const form = useFilterForm(DEFAULT_ADMIN_FILTERS);
  const requests = filterAdminRequests(state, form.values, view);
  return {
    state,
    view,
    control: form.control,
    requests,
    offers: filterAdminOffers(state, requests, form.values.partner),
  };
}
