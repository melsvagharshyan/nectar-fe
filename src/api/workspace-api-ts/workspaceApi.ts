import { api, DATA_TAGS } from "../api";
import { notificationsApi } from "../notifications-api-ts/notificationsApi";
import type {
  DraftToggleRequest,
  InterestRequest,
  MutationResult,
  SellRequest,
  SendOffersRequest,
} from "./types";

type Action<Arg> = (arg: Arg) => { url: string; method: "POST"; body?: object };

const post =
  <Arg>(url: (arg: Arg) => string, body?: (arg: Arg) => object): Action<Arg> =>
  (arg) => ({ url: url(arg), method: "POST", body: body?.(arg) });

export const workspaceApi = api.injectEndpoints({
  endpoints: (build) => {
    const action = <Arg>(query: Action<Arg>) =>
      build.mutation<MutationResult, Arg>({
        query,
        invalidatesTags: (_result, error) => (error ? [] : [...DATA_TAGS]),
      });

    /** Flags cached notifications as read right away and rolls back on failure. */
    const markRead = <Arg>(
      query: Action<Arg>,
      isTarget: (arg: Arg, eventId: string) => boolean,
      refetchList = false,
    ) =>
      build.mutation<MutationResult, Arg>({
        query,
        invalidatesTags: (_result, error) =>
          error
            ? []
            : refetchList
              ? ["Bootstrap", { type: "Notification", id: "LIST" }]
              : ["Bootstrap"],
        onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
          const patches = notificationsApi.util
            .selectCachedArgsForQuery(getState(), "getNotifications")
            .map((args) =>
              dispatch(
                notificationsApi.util.updateQueryData("getNotifications", args, (draft) => {
                  for (const page of draft.pages)
                    for (const item of page.items)
                      if (isTarget(arg, item.id)) item.read = true;
                }),
              ),
            );
          queryFulfilled.catch(() => patches.forEach((p) => p.undo()));
        },
      });

    return {
      startRequest: action(post<string>((id) => `/requests/${id}/start`)),
      transferRequest: action(
        post<string>((id) => `/requests/${id}/transfer`),
      ),
      toggleDraft: action(
        post<DraftToggleRequest>(
          ({ requestId, propertyId }) =>
            `/requests/${requestId}/drafts/${propertyId}/toggle`,
        ),
      ),
      sendOffers: action(
        post<SendOffersRequest>(
          ({ requestId }) => `/requests/${requestId}/offers`,
          ({ propertyIds }) => ({ propertyIds }),
        ),
      ),
      setInterest: action(
        post<InterestRequest>(
          ({ offerId }) => `/offers/${offerId}/interest`,
          ({ selected }) => ({ selected }),
        ),
      ),
      rejectOffer: action(post<string>((id) => `/offers/${id}/reject`)),
      restoreOffer: action(post<string>((id) => `/offers/${id}/restore`)),
      returnTransfer: action(post<string>((id) => `/transfers/${id}/return`)),
      sellTransfer: action(
        post<SellRequest>(
          ({ transferId }) => `/transfers/${transferId}/sell`,
          ({ propertyId }) => ({ propertyId }),
        ),
      ),
      readEvent: markRead(
        post<string>((id) => `/events/${id}/read`),
        (id, eventId) => id === eventId,
      ),
      readAllEvents: markRead(
        post<void>(() => "/events/read-all"),
        () => true,
        true,
      ),
    };
  },
});

export const {
  useStartRequestMutation,
  useTransferRequestMutation,
  useToggleDraftMutation,
  useSendOffersMutation,
  useSetInterestMutation,
  useRejectOfferMutation,
  useRestoreOfferMutation,
  useReturnTransferMutation,
  useSellTransferMutation,
  useReadEventMutation,
  useReadAllEventsMutation,
} = workspaceApi;
