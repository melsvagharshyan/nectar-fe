import { useState } from "react";
import {
  useApproveRegistrationMutation,
  useGetRegistrationsInfiniteQuery,
  useRejectRegistrationMutation,
} from "../../../api/registrations-api-ts/registrationsApi";
import type {
  Registration,
  RegistrationStatus,
} from "../../../api/registrations-api-ts/types";
import { getApiErrorMessage } from "../../../api/errors";
import { notify } from "../../../components/toaster";
import type { TabItem } from "../../../components/ui";
import { useFilterForm } from "../../../utils/hooks";
import {
  REGISTRATION_FILTER_DEFAULTS,
  REGISTRATION_STATUSES,
  STATUS_TAB_LABELS,
} from "./constants";
import type { RegistrationFilters } from "./types";

export function useRegistrations() {
  const [status, setStatus] = useState<RegistrationStatus>("pending");
  const filters = useFilterForm<RegistrationFilters>(REGISTRATION_FILTER_DEFAULTS);
  const { search, role } = filters.values;
  const query = useGetRegistrationsInfiniteQuery({
    status,
    search,
    role: role || undefined,
  });
  const pages = query.data?.pages;
  const counts = pages?.[0]?.counts;
  const tabs: TabItem<RegistrationStatus>[] = REGISTRATION_STATUSES.map((id) => ({
    id,
    label: STATUS_TAB_LABELS[id],
    count: counts?.[id] ?? 0,
  }));
  return {
    status,
    setStatus,
    tabs,
    filterControl: filters.control,
    registrations: pages?.flatMap((p) => p.items) ?? [],
    loading: query.isFetching && !query.isFetchingNextPage,
    loadingMore: query.isFetchingNextPage,
    hasMore: query.hasNextPage,
    loadMore: () => void query.fetchNextPage(),
  };
}

/** Approve/reject with feedback; the card moves to another tab on success. */
export function useRegistrationActions() {
  const [approveRegistration] = useApproveRegistrationMutation();
  const [rejectRegistration] = useRejectRegistrationMutation();

  const approve = async (registration: Registration) => {
    const result = await approveRegistration(registration.id);
    if (result.error) {
      notify.error("Не удалось одобрить заявку", {
        description: getApiErrorMessage(result.error),
      });
      return false;
    }
    notify.success(`Заявка одобрена — компания ${result.data.companyId} создана`, {
      description: `${registration.email} теперь может войти в Nectar`,
    });
    return true;
  };

  const reject = async (registration: Registration, reason: string) => {
    const result = await rejectRegistration({ id: registration.id, reason });
    if (result.error) {
      notify.error("Не удалось отклонить заявку", {
        description: getApiErrorMessage(result.error),
      });
      return false;
    }
    notify.success("Заявка отклонена", {
      description: "Заявитель увидит ваше сообщение при попытке входа",
    });
    return true;
  };

  return { approve, reject };
}
