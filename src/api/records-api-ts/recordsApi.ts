import { api, DATA_TAGS } from "../api";
import type { MutationResult } from "../workspace-api-ts/types";
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
    const write = <Arg>(
      method: Method,
      url: (arg: Arg) => string,
      body: (arg: Arg) => object,
    ) =>
      build.mutation<MutationResult, Arg>({
        query: (arg) => ({ url: url(arg), method, body: body(arg) }),
        invalidatesTags: (_result, error) => (error ? [] : [...DATA_TAGS]),
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
