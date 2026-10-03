import { skipToken } from "@reduxjs/toolkit/query";
import { useGetClientsInfiniteQuery } from "../../../api/clients-api-ts/clientsApi";
import { useGetNotificationsInfiniteQuery } from "../../../api/notifications-api-ts/notificationsApi";
import { useGetPropertiesFeedInfiniteQuery } from "../../../api/properties-api-ts/propertiesApi";
import { useGetRequestsInfiniteQuery } from "../../../api/requests-api-ts/requestsApi";
import { useDemo } from "../../../app/DemoProvider";
import { useRoute } from "../../../app/router";
import { useUnreadCount } from "../../../app/utils/hooks";
import { toBrokerView, toPartnerView } from "../../../demo/projections";
import { canSeeRequest } from "../../../demo/selectors";
import type { Company, Role } from "../../../demo/types";
import {
  actorForRole,
  brokerCompanyIdFor,
  currentCompanyId,
} from "../../../utils/helpers";
import { openRequestWorkspace } from "../../../utils/navigation";
import type { DirectoryTab, NotificationFilter } from "./types";

export function usePanelContext(role: Role) {
  const [state, dispatch] = useDemo();
  const route = useRoute();
  const params = {
    panel: route.params.get("panel"),
    objectId: route.params.get("object") || "",
    requestId: route.params.get("request") || "",
    clientId: route.params.get("client") || "",
    companyId: route.params.get("company") || "",
  };
  const actor = actorForRole(role);
  const projected =
    role === "broker"
      ? toBrokerView(state, currentCompanyId())
      : role === "partner"
        ? toPartnerView(state, currentCompanyId())
        : state;
  const request = state.requests.find((r) => r.id === params.requestId);
  const requestAllowed = !!request && canSeeRequest(state, actor, request);

  return {
    state,
    dispatch,
    route,
    params,
    actor,
    projected,
    request: requestAllowed ? request : undefined,
    goToRequest: (requestId: string) =>
      void openRequestWorkspace(state, role, requestId),
  };
}

const pageItems = <T,>(pages: { items: T[] }[] | undefined) =>
  pages?.flatMap((p) => p.items) ?? [];

const pagingOf = (query: {
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => unknown;
}) => ({
  loading: query.isFetching,
  hasMore: query.hasNextPage,
  loadMore: () => void query.fetchNextPage(),
});

export function useCompanyRecords(company: Company) {
  const rf = company.kind === "rf";
  const clients = useGetClientsInfiniteQuery(
    rf ? { company: company.id } : skipToken,
  );
  const properties = useGetPropertiesFeedInfiniteQuery(
    rf ? skipToken : { company: company.id },
  );
  const requests = clients.data?.pages.flatMap((p) => p.slice.requests) ?? [];
  return {
    clients: pageItems(clients.data?.pages),
    properties: pageItems(properties.data?.pages),
    requestCount: (clientId: string) =>
      requests.filter((r) => r.clientId === clientId).length,
    ...pagingOf(rf ? clients : properties),
  };
}

export function useDirectory(role: Role, tab: DirectoryTab, search: string) {
  const [state] = useDemo();
  const route = useRoute();
  const company =
    (role === "admin" && route.params.get("company")) || brokerCompanyIdFor(state);
  const args = role === "partner" ? skipToken : { company, search };
  const clients = useGetClientsInfiniteQuery(tab === "clients" ? args : skipToken);
  const requests = useGetRequestsInfiniteQuery(tab === "requests" ? args : skipToken);
  return {
    company,
    clients: pageItems(clients.data?.pages),
    requests: pageItems(requests.data?.pages),
    ...pagingOf(tab === "clients" ? clients : requests),
  };
}

export function useNotificationFeed(filter: NotificationFilter) {
  const attention = filter === "attention";
  const events = useGetNotificationsInfiniteQuery(
    { filter: attention ? "all" : filter },
    { skip: attention },
  );
  const requests = useGetRequestsInfiniteQuery(
    { stage: "attention" },
    { skip: !attention },
  );
  const source = attention ? requests : events;
  const unreadCount = useUnreadCount();
  return {
    canReadAll: !attention && unreadCount > 0,
    events: attention ? [] : pageItems(events.data?.pages),
    attentionRequests: attention ? pageItems(requests.data?.pages) : [],
    loading: source.isLoading,
    hasMore: source.hasNextPage,
    loadingMore: source.isFetchingNextPage,
    loadMore: () => void source.fetchNextPage(),
  };
}
