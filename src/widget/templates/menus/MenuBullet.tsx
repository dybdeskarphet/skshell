import Gtk from "gi://Gtk?version=4.0";
import { Accessor } from "gnim";
import { MaybeAccessor } from "../../../types";

interface MenuBulletProps {
  icon: string;
  label: string;
  value: MaybeAccessor<string>;
}

export const MenuBullet = ({ icon, label, value }: MenuBulletProps) => {
  return (
    <box
      hexpand={true}
      orientation={Gtk.Orientation.HORIZONTAL}
      css_classes={["menu-bullet"]}
    >
      <box halign={Gtk.Align.START} css_classes={["menu-bullet-title"]}>
        <label css_classes={["menu-bullet-icon"]} label={icon} />
        <label css_classes={["menu-bullet-label"]} label={label} />
      </box>
      <box hexpand={true} halign={Gtk.Align.END}>
        <label css_classes={["menu-bullet-value"]} label={value} />
      </box>
    </box>
  );
};
