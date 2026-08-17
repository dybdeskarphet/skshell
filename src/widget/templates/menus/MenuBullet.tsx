import Gtk from "gi://Gtk?version=4.0";
import { Accessor } from "gnim";

interface MenuBulletProps {
  icon: string;
  label: string;
  value: string | Accessor<string>;
}

export const MenuBullet = ({ icon, label, value }: MenuBulletProps) => {
  return (
    <box orientation={Gtk.Orientation.HORIZONTAL} css_classes={["menu-bullet"]}>
      <label css_classes={["menu-bullet-icon"]} label={icon} />
      <label css_classes={["menu-bullet-label"]} label={label} />
      <label css_classes={["menu-bullet-value"]} label={value} />
    </box>
  );
};
