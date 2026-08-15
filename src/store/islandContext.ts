import { createContext, createState } from "ags";

export const createIslandState = () => {
  const [islandOpen, setIslandOpen] = createState(false);
  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  const keepOpen = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    setIslandOpen(true);
  };

  const scheduleClose = (delayMs: number = 2000) => {
    if (closeTimer) clearTimeout(closeTimer);

    closeTimer = setTimeout(() => {
      setIslandOpen(false);
      closeTimer = null;
    }, delayMs);
  };

  const closeImmediately = () => {
    if (closeTimer) clearTimeout(closeTimer);
    setIslandOpen(false);
  };

  const toggle = () => {
    islandOpen.get() ? closeImmediately() : keepOpen();
  };

  return {
    islandOpen,
    setIslandOpen,
    keepOpen,
    scheduleClose,
    closeImmediately,
    toggle,
  };
};

export type IslandState = ReturnType<typeof createIslandState>;
export const IslandContext = createContext<IslandState>(null!);
