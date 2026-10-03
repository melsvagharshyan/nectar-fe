import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "Me",
    "Bootstrap",
    "Client",
    "Request",
    "Property",
    "Offer",
    "Notification",
    "Company",
    "Analytics",
  ],
  endpoints: () => ({}),
});

/** Workflow and record writes can move items between any role-scoped list. */
export const DATA_TAGS = [
  "Bootstrap",
  "Analytics",
  { type: "Client", id: "LIST" },
  { type: "Request", id: "LIST" },
  { type: "Property", id: "LIST" },
  { type: "Offer", id: "LIST" },
  { type: "Notification", id: "LIST" },
  { type: "Company", id: "LIST" },
] as const;
