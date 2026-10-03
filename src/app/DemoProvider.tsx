import { createContext, useContext, useMemo, useRef, type ReactNode } from "react";
import { useGetBootstrapQuery } from "../api/bootstrap-api-ts/bootstrapApi";
import { getApiErrorMessage } from "../api/errors";
import type { Slice } from "../api/pagination";
import { Button, Empty } from "../components/ui";
import { mergeState } from "../demo/scope";
import type { DemoAction, DemoState } from "../demo/types";
import { useWorkspaceDispatch, type ActionResult } from "./utils/hooks";

type DemoContext = [DemoState, (action: DemoAction) => Promise<ActionResult>];

const Context = createContext<DemoContext | null>(null);

const EMPTY_STATE: Omit<DemoState, "companies" | "employees"> = {
  clients: [],
  requests: [],
  properties: [],
  offers: [],
  transfers: [],
  drafts: {},
  events: [],
};

/**
 * Holds only reference data (companies, employees). Pages and panels load their
 * own paginated records and expose them to children through `StateScope`.
 */
export function DemoProvider({ children }: { children: ReactNode }) {
  const { data, error, isLoading, refetch } = useGetBootstrapQuery();
  const { dispatch, error: actionError } = useWorkspaceDispatch();
  const state = useMemo<DemoState | undefined>(
    () =>
      data && {
        ...EMPTY_STATE,
        companies: data.companies,
        employees: data.employees,
        ...(actionError ? { error: actionError } : {}),
      },
    [data, actionError],
  );
  const value = useMemo<DemoContext | undefined>(
    () => state && [state, dispatch],
    [state, dispatch],
  );

  if (isLoading) return <Empty text="Загрузка данных…" />;
  if (!value)
    return (
      <Empty text={getApiErrorMessage(error)}>
        <Button onClick={() => void refetch()}>Повторить</Button>
      </Empty>
    );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

/** Makes the records of loaded pages visible to `useDemo()` below it. */
export function StateScope({
  slices,
  children,
}: {
  slices: SliceList;
  children: ReactNode;
}) {
  const state = useScopedState(slices);
  const [, dispatch] = useDemo();
  const value = useMemo<DemoContext>(() => [state, dispatch], [state, dispatch]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

type SliceList = (Partial<Slice> | undefined)[];

const sameSlices = (a: SliceList, b: SliceList) =>
  a.length === b.length && a.every((s, i) => s === b[i]);

export function useScopedState(slices: SliceList) {
  const [base] = useDemo();
  const cache = useRef<{ base: DemoState; slices: SliceList; state: DemoState }>(null);
  const hit = cache.current;
  if (hit && hit.base === base && sameSlices(hit.slices, slices)) return hit.state;
  const state = mergeState(base, slices);
  cache.current = { base, slices, state };
  return state;
}

export function useDemo() {
  const value = useContext(Context);
  if (!value) throw new Error("Missing DemoProvider");
  return value;
}
