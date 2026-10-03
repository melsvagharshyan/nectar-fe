import type { Slice } from "../api/pagination";
import type { DemoState } from "./types";

type Keyed = { id: string };

const mergeById = <T extends Keyed>(lists: T[][]) => {
  if (lists.length === 1) return lists[0]!;
  return [...new Map(lists.flat().map((item) => [item.id, item])).values()];
};

const SLICE_LISTS = [
  "clients",
  "requests",
  "properties",
  "offers",
  "transfers",
  "events",
] as const;

/** Layers page slices over a state; later slices win for the same id. */
export function mergeState(
  base: DemoState,
  slices: (Partial<Slice> | undefined)[],
): DemoState {
  const parts = slices.filter((s): s is Partial<Slice> => !!s);
  if (!parts.length) return base;
  const next: DemoState = { ...base };
  for (const key of SLICE_LISTS) {
    const lists = parts.map((p) => p[key]).filter((l) => !!l?.length);
    if (lists.length) next[key] = mergeById([base[key], ...lists] as Keyed[][]) as never;
  }
  next.drafts = Object.assign({}, base.drafts, ...parts.map((p) => p.drafts ?? {}));
  return next;
}

export const sliceOf = (pages: { slice: Slice }[] | undefined) =>
  pages?.map((p) => p.slice) ?? [];
