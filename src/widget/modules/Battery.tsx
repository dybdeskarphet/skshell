import AstalBattery from "gi://AstalBattery?version=0.1";
import { createBinding, createComputed } from "gnim";
import { Module } from "../templates/core/Module";
import Json from "gi://Json?version=1.0";
import { IslandContext } from "../../store/islandContext";

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

export const Battery = () => {
  const { toggleMenu } = IslandContext.use();
  const battery = AstalBattery.get_default();

  const percentage = createBinding(battery, "percentage");
  const charging = createBinding(battery, "charging");

  const text = percentage.as((p) => `${Math.round(p * 100)}%`);
  const icon = createComputed(() => {
    return getBatteryIcon(percentage(), charging());
  });

  return (
    <Module
      icon={icon}
      text={text}
      showOnHover={true}
      onClicked={(posX) => {
        toggleMenu("battery", posX);
      }}
    />
  );
};
