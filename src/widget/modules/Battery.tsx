import AstalBattery from "gi://AstalBattery?version=0.1";
import { createBinding, createComputed } from "gnim";
import { Module } from "../templates/core/Module";
import Json from "gi://Json?version=1.0";
import { IslandContext } from "../../store/islandContext";
import { batteryService } from "../../services/shared/batteryService";

export const Battery = () => {
  const { toggleMenu } = IslandContext.use();

  return (
    <Module
      icon={batteryService.icon}
      text={batteryService.percentageText}
      showOnHover={true}
      onClicked={(posX) => {
        toggleMenu("battery", posX);
      }}
    />
  );
};
