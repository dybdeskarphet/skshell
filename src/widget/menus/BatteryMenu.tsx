import AstalBattery from "gi://AstalBattery?version=0.1";
import { IslandContext } from "../../store/islandContext";
import { Menu } from "../templates/core/Menu";
import { createBinding } from "gnim";
import { MenuBullet } from "../templates/menus/MenuBullet";
import { batteryService } from "../../services/shared/batteryService";

export const BatteryMenu = () => {
  return (
    <Menu name="battery" title="Battery" icon="󰁹">
      <MenuBullet
        icon={"󱐋"}
        label={"Voltage"}
        value={batteryService.voltageText}
      />
      <MenuBullet
        icon={"󱈏"}
        label={"Actual capacity"}
        value={batteryService.capacityText}
      />
    </Menu>
  );
};
