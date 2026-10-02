import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Me", "Workspace"],
  endpoints: () => ({}),
});
