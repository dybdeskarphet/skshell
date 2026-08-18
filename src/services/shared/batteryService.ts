import AstalBattery from "gi://AstalBattery?version=0.1";
import { createBinding, createComputed } from "gnim";
import { createPausableBinding } from "../../utils/pausable";
import { isAnyIslandOpen } from "../../store/islandRegistry";
import { Battery } from "../../widget/modules/Battery";

const getBatteryIcon = (percent: number, charging: boolean): string => {
  if (charging) {
    if (percent >= 0.97) return "󰂅";
    if (percent >= 0.9) return "󰂋";
    if (percent >= 0.8) return "󰂊";
    if (percent >= 0.7) return "󰢞";
    if (percent >= 0.6) return "󰂉";
    if (percent >= 0.5) return "󰢝";
    if (percent >= 0.4) return "󰂈";
    if (percent >= 0.3) return "󰂇";
    if (percent >= 0.2) return "󰂆";
    if (percent >= 0.1) return "󰢜";
    return "󰢟";
  }

  if (percent >= 0.97) return "󰁹";
  if (percent >= 0.9) return "󰂂";
  if (percent >= 0.8) return "󰂁";
  if (percent >= 0.7) return "󰂀";
  if (percent >= 0.6) return "󰁿";
  if (percent >= 0.5) return "󰁾";
  if (percent >= 0.4) return "󰁽";
  if (percent >= 0.3) return "󰁼";
  if (percent >= 0.2) return "󰁻";
  if (percent >= 0.1) return "󰁺";
  return "󰂎";
};

export class BatteryService {
  private static instance: BatteryService;

  private display = AstalBattery.get_default();
  private upower = new AstalBattery.UPower();

  public mainDevice = this.upower.devices.find(
    (d) => d.is_battery && d.power_supply,
  );

  public percentage = createBinding(this.display, "percentage");
  public charging = createBinding(this.display, "charging");

  public percentageText = this.percentage.as((p) => `${Math.round(p * 100)}%`);
  public icon = createComputed(() => {
    return getBatteryIcon(this.percentage(), this.charging());
  });

  public voltage = createPausableBinding(
    this.mainDevice,
    "voltage",
    isAnyIslandOpen,
    0,
  );
  public voltageText = this.voltage.as((v) => `${v.toFixed()} V`);

  public capacity = createPausableBinding(
    this.mainDevice,
    "capacity",
    isAnyIslandOpen,
    0,
  );
  public capacityText = this.capacity.as((c) => `${(c * 100).toFixed(2)}%`);

  public static get_default() {
    return (this.instance ??= new BatteryService());
  }
}

export const batteryService = BatteryService.get_default();
