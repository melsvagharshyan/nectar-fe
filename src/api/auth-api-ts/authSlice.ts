import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getStoredUser } from "../session";
import type { UserDto } from "./types";

export interface AuthState {
  user: UserDto | null;
}

const initialState: AuthState = { user: getStoredUser() };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signedIn: (state, { payload }: PayloadAction<UserDto>) => {
      state.user = payload;
    },
    userRefreshed: (state, { payload }: PayloadAction<UserDto>) => {
      state.user = payload;
    },
    signedOut: (state) => {
      state.user = null;
    },
  },
});

export const { signedIn, userRefreshed, signedOut } = authSlice.actions;
