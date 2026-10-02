import { createContext, useContext, type ReactNode } from "react";
import { getApiErrorMessage } from "../api/errors";
import { useGetWorkspaceQuery } from "../api/workspace-api-ts/workspaceApi";
import { Button, Empty } from "../components/ui";
import type { DemoAction, DemoState } from "../demo/types";
import { useWorkspaceDispatch, type ActionResult } from "./utils/hooks";

type DemoContext = [DemoState, (action: DemoAction) => Promise<ActionResult>];

const Context = createContext<DemoContext | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const { data, error, isLoading, refetch } = useGetWorkspaceQuery();
  const { dispatch, error: actionError } = useWorkspaceDispatch();

  if (isLoading) return <Empty text="Загрузка данных…" />;
  if (!data)
    return (
      <Empty text={getApiErrorMessage(error)}>
        <Button onClick={() => void refetch()}>Повторить</Button>
      </Empty>
    );

  const state: DemoState = actionError ? { ...data, error: actionError } : data;
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}

export function useDemo() {
  const value = useContext(Context);
  if (!value) throw new Error("Missing DemoProvider");
  return value;
}
