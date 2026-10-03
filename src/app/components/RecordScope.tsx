import type { ReactNode } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetClientQuery } from "../../api/clients-api-ts/clientsApi";
import { useGetPropertyQuery } from "../../api/properties-api-ts/propertiesApi";
import { useGetRequestQuery } from "../../api/requests-api-ts/requestsApi";
import type { Role } from "../../demo/types";
import { StateScope } from "../DemoProvider";

/**
 * Loads the request, client and property named by a panel or editor and exposes
 * their related records to `useDemo()` below it. Waits for the first load so
 * forms can take their initial values from complete data.
 */
export function RecordScope({
  role,
  requestId,
  clientId,
  propertyId,
  fallback,
  children,
}: {
  role: Role;
  requestId?: string;
  clientId?: string;
  propertyId?: string;
  fallback: ReactNode;
  children: ReactNode;
}) {
  const request = useGetRequestQuery(requestId || skipToken);
  const client = useGetClientQuery(
    clientId && role !== "partner" ? clientId : skipToken,
  );
  const property = useGetPropertyQuery(propertyId || skipToken);
  if (request.isLoading || client.isLoading || property.isLoading) return fallback;
  return (
    <StateScope slices={[client.data, request.data, property.data]}>
      {children}
    </StateScope>
  );
}
