import Gdk from "gi://Gdk?version=4.0";
import {
  createIslandState,
  IslandContext,
  IslandState,
} from "../store/islandContext";
import { Hotspot } from "./island/Hotspot";
import { IslandPopup } from "./island/IslandPopup";
import { exit } from "system";
import { BatteryMenu } from "./menus/BatteryMenu";

export const Island = (gdkmonitor: Gdk.Monitor) => {
  const islandState = createIslandState(gdkmonitor);

  return (
    <IslandContext value={islandState}>
      {() => (
        <>
          {Hotspot(gdkmonitor)}
          {IslandPopup(gdkmonitor)}
          {BatteryMenu()}
        </>
      )}
    </IslandContext>
  );
};
