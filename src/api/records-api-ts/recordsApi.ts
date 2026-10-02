import { api } from "../api";
import { settled } from "../settled";
import type { WorkspaceState } from "../workspace-api-ts/types";
import { workspaceApi } from "../workspace-api-ts/workspaceApi";
import type {
  ClientPayload,
  CompanyPayload,
  EmployeePayload,
  PropertyPayload,
  RequestPayload,
  UploadResponse,
  WithId,
} from "./types";

type Method = "POST" | "PATCH";

export const recordsApi = api.injectEndpoints({
  endpoints: (build) => {
    /** Writes respond with the refreshed workspace, which replaces the cache. */
    const write = <Arg>(
      method: Method,
      url: (arg: Arg) => string,
      body: (arg: Arg) => object,
    ) =>
      build.mutation<WorkspaceState, Arg>({
        query: (arg) => ({ url: url(arg), method, body: body(arg) }),
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          const data = await settled(queryFulfilled);
          if (!data) return;
          dispatch(
            workspaceApi.util.upsertQueryData("getWorkspace", undefined, data),
          );
        },
      });

    return {
      createClient: write<ClientPayload>("POST", () => "/clients", (b) => b),
      updateClient: write<WithId<ClientPayload>>(
        "PATCH",
        ({ id }) => `/clients/${id}`,
        ({ body }) => body,
      ),
      createRequest: write<WithId<RequestPayload>>(
        "POST",
        ({ id }) => `/clients/${id}/requests`,
        ({ body }) => body,
      ),
      updateRequest: write<WithId<RequestPayload>>(
        "PATCH",
        ({ id }) => `/requests/${id}`,
        ({ body }) => body,
      ),
      createProperty: write<PropertyPayload>("POST", () => "/properties", (b) => b),
      updateProperty: write<WithId<PropertyPayload>>(
        "PATCH",
        ({ id }) => `/properties/${id}`,
        ({ body }) => body,
      ),
      createCompany: write<CompanyPayload>("POST", () => "/companies", (b) => b),
      updateCompany: write<WithId<CompanyPayload>>(
        "PATCH",
        ({ id }) => `/companies/${id}`,
        ({ body }) => body,
      ),
      createEmployee: write<WithId<EmployeePayload>>(
        "POST",
        ({ id }) => `/companies/${id}/employees`,
        ({ body }) => body,
      ),
      updateEmployee: write<WithId<EmployeePayload>>(
        "PATCH",
        ({ id }) => `/employees/${id}`,
        ({ body }) => body,
      ),
      uploadImage: build.mutation<UploadResponse, File>({
        query: (file) => {
          const body = new FormData();
          body.append("file", file);
          return { url: "/uploads", method: "POST", body };
        },
      }),
    };
  },
});

export const {
  useCreateClientMutation,
  useUpdateClientMutation,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useUploadImageMutation,
} = recordsApi;
