import { useCallback, useState } from "react";
import { api } from "../../api/api";
import { authApi } from "../../api/auth-api-ts/authApi";
import { signedOut } from "../../api/auth-api-ts/authSlice";
import { useGetBootstrapQuery } from "../../api/bootstrap-api-ts/bootstrapApi";
import { getApiErrorMessage } from "../../api/errors";
import { useAppDispatch, useAppSelector } from "../../api/store";
import { workspaceApi } from "../../api/workspace-api-ts/workspaceApi";
import { notify } from "../../components/toaster";
import type { DemoAction } from "../../demo/types";
import { ACTION_ERROR_TITLES, AUTH_ROUTES } from "./constants";
import { redirect } from "../router";

export interface ActionResult {
  error?: string;
}

export const useUnreadCount = () => useGetBootstrapQuery().data?.unreadCount ?? 0;

export const useCurrentUser = () => useAppSelector((s) => s.auth.user);

export function useSignOut() {
  const dispatch = useAppDispatch();
  const role = useCurrentUser()?.role;
  return useCallback(async () => {
    // The httpOnly cookie can only be cleared by the server; sign out locally regardless.
    await dispatch(authApi.endpoints.signOut.initiate());
    dispatch(signedOut());
    dispatch(api.util.resetApiState());
    redirect(role === "admin" ? AUTH_ROUTES.adminSignIn : AUTH_ROUTES.signIn);
    notify.info("Вы вышли из аккаунта", { description: "До скорой встречи!" });
  }, [dispatch, role]);
}

const { endpoints } = workspaceApi;

/** Sends a workspace action to the backend; the server applies the business rules. */
export function useWorkspaceDispatch() {
  const appDispatch = useAppDispatch();
  const [error, setError] = useState<string>();

  const dispatch = useCallback(
    async (action: DemoAction): Promise<ActionResult> => {
      setError(undefined);
      const send = () => {
        switch (action.type) {
          case "READ_EVENT":
            return appDispatch(endpoints.readEvent.initiate(action.eventId));
          case "READ_ALL_EVENTS":
            return appDispatch(endpoints.readAllEvents.initiate());
          case "INTEREST":
            return appDispatch(
              endpoints.setInterest.initiate({
                offerId: action.offerId,
                selected: action.selected,
              }),
            );
          case "REJECT":
            return appDispatch(endpoints.rejectOffer.initiate(action.offerId));
          case "RESTORE":
            return appDispatch(endpoints.restoreOffer.initiate(action.offerId));
          case "DRAFT_TOGGLE":
            return appDispatch(
              endpoints.toggleDraft.initiate({
                requestId: action.requestId,
                propertyId: action.propertyId,
              }),
            );
          case "SEND_OFFERS":
            return appDispatch(
              endpoints.sendOffers.initiate({
                requestId: action.requestId,
                propertyIds: action.propertyIds,
              }),
            );
          case "TRANSFER":
            return appDispatch(
              endpoints.transferRequest.initiate(action.requestId),
            );
          case "RETURN":
            return appDispatch(
              endpoints.returnTransfer.initiate({
                transferId: action.transferId,
                reason: action.reason,
              }),
            );
          case "SELL":
            return appDispatch(
              endpoints.sellTransfer.initiate({
                transferId: action.transferId,
                propertyId: action.propertyId,
              }),
            );
          case "SUBMIT":
            return appDispatch(
              endpoints.submitRequest.initiate(action.requestId),
            );
          case "APPROVE_OFFER":
            return appDispatch(endpoints.approveOffer.initiate(action.offerId));
          case "DECLINE_OFFER":
            return appDispatch(
              endpoints.declineOffer.initiate({
                offerId: action.offerId,
                reason: action.reason,
              }),
            );
          case "RESUBMIT_OFFER":
            return appDispatch(endpoints.resubmitOffer.initiate(action.offerId));
          case "APPROVE_REQUEST":
            return appDispatch(
              endpoints.approveRequest.initiate(action.requestId),
            );
          case "REJECT_REQUEST":
            return appDispatch(
              endpoints.rejectRequest.initiate({
                requestId: action.requestId,
                reason: action.reason,
              }),
            );
        }
      };
      const result = await send();
      if (!result.error) return {};
      const message = getApiErrorMessage(result.error);
      setError(message);
      notify.error(ACTION_ERROR_TITLES[action.type], { description: message });
      return { error: message };
    },
    [appDispatch],
  );

  return { dispatch, error };
}
