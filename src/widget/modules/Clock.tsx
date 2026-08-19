import { clockService } from "../../services/shared/clockService";
import { IslandContext } from "../../store/islandContext";
import { Module } from "../templates/core/Module";

export const Clock = () => {
  const { toggleMenu } = IslandContext.use();

  return (
    <Module
      text={clockService.time}
      showOnHover={false}
      onClicked={(posX) => {
        toggleMenu("clock", posX);
      }}
    />
  );
};
