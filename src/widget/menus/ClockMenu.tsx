import { clockService } from "../../services/shared/clockService";
import { Menu } from "../templates/core/Menu";
import { BigLabel } from "../templates/menus/BigLabel";

export const ClockMenu = () => {
  return (
    <Menu name="clock" title="Date & Clock" icon="󰸗">
      <BigLabel
        label={clockService.timeWithSeconds}
        footer={clockService.date}
        withBackground={true}
      />
    </Menu>
  );
};
