import { api } from "../api";
import { settled } from "../settled";
import type {
  DraftToggleRequest,
  InterestRequest,
  SellRequest,
  SendOffersRequest,
  WorkspaceState,
} from "./types";

type Action<Arg> = (arg: Arg) => { url: string; method: "POST"; body?: object };

const post =
  <Arg>(url: (arg: Arg) => string, body?: (arg: Arg) => object): Action<Arg> =>
  (arg) => ({ url: url(arg), method: "POST", body: body?.(arg) });

export const workspaceApi = api.injectEndpoints({
  endpoints: (build) => {
    /**
     * Each action responds with the refreshed snapshot, so the cached
     * workspace is replaced directly instead of being refetched.
     */
    const action = <Arg>(query: Action<Arg>) =>
      build.mutation<WorkspaceState, Arg>({
        query,
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          const data = await settled(queryFulfilled);
          if (!data) return;
          dispatch(
            workspaceApi.util.upsertQueryData("getWorkspace", undefined, data),
          );
        },
      });

    return {
      getWorkspace: build.query<WorkspaceState, void>({
        query: () => "/workspace",
        providesTags: ["Workspace"],
      }),
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
      readEvent: action(post<string>((id) => `/events/${id}/read`)),
    };
  },
});

export const {
  useGetWorkspaceQuery,
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
} = workspaceApi;
