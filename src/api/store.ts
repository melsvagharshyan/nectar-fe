import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./api";
import { authSlice } from "./auth-api-ts/authSlice";
import { setStoredUser } from "./session";
import "./auth-api-ts/authApi";
import "./workspace-api-ts/workspaceApi";
import "./records-api-ts/recordsApi";
import "./bootstrap-api-ts/bootstrapApi";
import "./clients-api-ts/clientsApi";
import "./requests-api-ts/requestsApi";
import "./properties-api-ts/propertiesApi";
import "./offers-api-ts/offersApi";
import "./notifications-api-ts/notificationsApi";
import "./analytics-api-ts/analyticsApi";
import "./companies-api-ts/companiesApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

let persisted = store.getState().auth;
store.subscribe(() => {
  const { auth } = store.getState();
  if (auth === persisted) return;
  persisted = auth;
  setStoredUser(auth.user);
  if (!auth.user) store.dispatch(api.util.resetApiState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
