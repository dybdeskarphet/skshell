import { createComputed, createState } from "gnim";
import { IslandState } from "./islandContext";

export const activeIslandStates = new Map<string, IslandState>();

const [openMonitors, setOpenMointors] = createState<Set<string>>(new Set());

export const setGlobalIslandOpen = (connector: string, isOpen: boolean) => {
  setOpenMointors((prev) => {
    const updated = new Set(prev);
    if (isOpen) {
      updated.add(connector);
    } else {
      updated.delete(connector);
    }
    return updated;
  });
};

export const isAnyIslandOpen = createComputed(() => {
  return openMonitors().size > 0;
});
