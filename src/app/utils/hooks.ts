import { useCallback, useEffect, useState } from "react";
import { api } from "../../api/api";
import { authApi } from "../../api/auth-api-ts/authApi";
import { signedOut } from "../../api/auth-api-ts/authSlice";
import { getApiErrorMessage } from "../../api/errors";
import { useAppDispatch, useAppSelector } from "../../api/store";
import { workspaceApi } from "../../api/workspace-api-ts/workspaceApi";
import { visibleEvents } from "../../demo/selectors";
import type { DemoAction, Role } from "../../demo/types";
import { actorForRole } from "../../utils/helpers";
import { useDemo } from "../DemoProvider";
import { AUTH_ROUTES, TOAST_DURATION_MS } from "./constants";
import { redirect } from "../router";

export interface ActionResult {
  error?: string;
}

export function useToast() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(""), TOAST_DURATION_MS);
    return () => clearTimeout(id);
  }, [message]);
  return { message, showToast: setMessage };
}

export function useUnreadCount(role: Role) {
  const [state] = useDemo();
  return visibleEvents(state, actorForRole(role)).filter(
    (e) => !state.readEventIds.includes(role + ":" + e.id),
  ).length;
}

export const useCurrentUser = () => useAppSelector((s) => s.auth.user);

export function useSignOut() {
  const dispatch = useAppDispatch();
  return useCallback(async () => {
    // The httpOnly cookie can only be cleared by the server; sign out locally regardless.
    await dispatch(authApi.endpoints.signOut.initiate());
    dispatch(signedOut());
    dispatch(api.util.resetApiState());
    redirect(AUTH_ROUTES.signIn);
  }, [dispatch]);
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
              endpoints.returnTransfer.initiate(action.transferId),
            );
          case "SELL":
            return appDispatch(
              endpoints.sellTransfer.initiate({
                transferId: action.transferId,
                propertyId: action.propertyId,
              }),
            );
          case "START":
            return appDispatch(
              endpoints.startRequest.initiate(action.requestId),
            );
        }
      };
      const result = await send();
      if (!result.error) return {};
      const message = getApiErrorMessage(result.error);
      setError(message);
      return { error: message };
    },
    [appDispatch],
  );

  return { dispatch, error };
}
