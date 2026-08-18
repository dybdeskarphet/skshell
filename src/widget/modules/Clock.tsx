import { clockService } from "../../services/shared/clockService";
import { Module } from "../templates/core/Module";

export const Clock = () => {
  return <Module text={clockService.time} showOnHover={false} />;
};
