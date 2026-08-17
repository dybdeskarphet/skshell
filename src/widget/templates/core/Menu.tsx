import { createComputed } from "gnim";
import { IslandContext } from "../../store/islandContext";
import Astal from "gi://Astal?version=4.0";
import Gtk from "gi://Gtk?version=4.0";

interface MenuProps {
  name: string;
  icon: string;
  title: string;
  marginTop?: number;
  cssClasses?: string[];
  children?: JSX.Element | JSX.Element[];
}

export const Menu = ({
  name,
  title,
  icon,
  marginTop = 48,
  cssClasses,
  children,
}: MenuProps) => {
  const {
    gdkmonitor,
    setActiveMenu,
    activeMenu,
    keepOpen,
    keepMenuOpen,
    scheduleMenuClose,
    scheduleClose,
    closeImmediately,
    menuPosX,
  } = IslandContext.use();

  const isOpen = createComputed(() => activeMenu() === name);

  return (
    <window
      visible
      gdkmonitor={gdkmonitor}
      name={`island-menu-${name}-${gdkmonitor.get_connector()}`}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
      marginTop={marginTop}
      marginLeft={menuPosX}
      $={(self) => {
        const motion = new Gtk.EventControllerMotion();
        motion.connect("enter", () => {
          keepOpen();
          keepMenuOpen();
        });
        motion.connect("leave", () => {
          scheduleMenuClose();
          scheduleClose();
        });

        self.add_controller(motion);
      }}
    >
      <revealer
        reveal_child={isOpen}
        transition_type={Gtk.RevealerTransitionType.CROSSFADE}
        transition_duration={200}
      >
        <box
          css_classes={["menu", ...(cssClasses ?? [])]}
          orientation={Gtk.Orientation.VERTICAL}
          halign={Gtk.Align.START}
          valign={Gtk.Align.START}
        >
          <box
            css_classes={["menu-header"]}
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.START}
          >
            <label label={icon} css_classes={["menu-icon"]} />
            <label label={title} css_classes={["menu-title"]} />
          </box>

          <box css_classes={["menu-separator"]} />

          <box
            orientation={Gtk.Orientation.VERTICAL}
            halign={Gtk.Align.START}
            css_classes={["menu-body"]}
          >
            {children}
          </box>
        </box>
      </revealer>
    </window>
  );
};
