import { createContext, createState } from "ags";
import Gdk from "gi://Gdk?version=4.0";
import { setGlobalIslandOpen } from "./islandRegistry";

export const createIslandState = (gdkmonitor: Gdk.Monitor) => {
  const [islandOpen, setIslandOpen] = createState(false);
  const [activeMenu, setActiveMenu] = createState<string | null>(null);
  const [menuPosX, setMenuPosX] = createState<number>(0);
  const outputName = gdkmonitor.get_connector() ?? "default";
  let closeTimer: ReturnType<typeof setTimeout> | null = null;
  let closeMenuTimer: ReturnType<typeof setTimeout> | null = null;

  const keepOpen = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    setIslandOpen(true);
    setGlobalIslandOpen(outputName, true);
  };

  const scheduleClose = (delayMs: number = 2000) => {
    if (closeTimer) clearTimeout(closeTimer);

    closeTimer = setTimeout(() => {
      setIslandOpen(false);
      setGlobalIslandOpen(outputName, false);
      setActiveMenu(null);
      closeTimer = null;
    }, delayMs);
  };

  const closeImmediately = () => {
    if (closeTimer) clearTimeout(closeTimer);
    setIslandOpen(false);
    setGlobalIslandOpen(outputName, false);
    setActiveMenu(null);
  };

  const toggle = () => {
    islandOpen.get() ? closeImmediately() : keepOpen();
  };

  const toggleMenu = (name: string, posX: number) => {
    keepOpen();
    if (posX !== undefined) setMenuPosX(posX);
    setActiveMenu(activeMenu.get() === name ? null : name);
  };

  const scheduleMenuClose = (delayMs: number = 2000) => {
    if (closeMenuTimer) clearTimeout(closeMenuTimer);

    closeMenuTimer = setTimeout(() => {
      setActiveMenu(null);
      closeMenuTimer = null;
    }, delayMs);
  };

  const keepMenuOpen = () => {
    if (closeMenuTimer) {
      clearTimeout(closeMenuTimer);
      closeMenuTimer = null;
    }
  };

  return {
    gdkmonitor,
    islandOpen,
    setIslandOpen,
    keepOpen,
    scheduleClose,
    closeImmediately,
    toggle,
    toggleMenu,
    activeMenu,
    setActiveMenu,
    keepMenuOpen,
    scheduleMenuClose,
    menuPosX,
    setMenuPosX,
  };
};

export type IslandState = ReturnType<typeof createIslandState>;
export const IslandContext = createContext<IslandState>(null!);
