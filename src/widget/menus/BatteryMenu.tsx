import AstalBattery from "gi://AstalBattery?version=0.1";
import { IslandContext } from "../../store/islandContext";
import { Menu } from "../templates/core/Menu";
import { createBinding } from "gnim";

export const BatteryMenu = () => {
  

  return <Menu name="battery" title="Battery" icon="󰁹"></Menu>;
};
