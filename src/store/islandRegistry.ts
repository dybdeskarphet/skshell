import { createComputed, createState } from "gnim";

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
