import Gtk from "gi://Gtk?version=4.0";
import { Accessor, createState } from "gnim";
import Gdk from "gi://Gdk?version=4.0";
import { IslandContext } from "../../../store/islandContext";

interface ModuleProps {
  icon?: string | Accessor<string>;
  text?: string | Accessor<string>;
  showOnHover?: boolean;
  onClicked?: (posX: number) => void;
  cssClasses?: string[];
}

export const Module = ({
  icon,
  text,
  showOnHover = true,
  onClicked,
  cssClasses,
}: ModuleProps) => {
  const [hovered, setHovered] = createState(false);
  const { keepOpen, scheduleClose, gdkmonitor } = IslandContext.use();
  const monitorWidth = gdkmonitor.get_geometry().width;

  const content = (
    <box
      css_classes={["module-inner"]}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
    >
      {icon && <label label={icon} css_classes={["module-icon"]} />}
      {text && (
        <revealer
          reveal_child={showOnHover ? hovered : true}
          transition_type={Gtk.RevealerTransitionType.SLIDE_RIGHT}
          transition_duration={200}
        >
          <label label={text} css_classes={["module-text"]} />
        </revealer>
      )}
    </box>
  );

  return (
    <box
      cursor={onClicked ? Gdk.Cursor.new_from_name("pointer", null) : null}
      $={(self) => {
        // showOnHover logic
        const motion = new Gtk.EventControllerMotion();
        motion.connect("enter", () => {
          keepOpen();
          if (showOnHover) setHovered(true);
        });
        motion.connect("leave", () => {
          scheduleClose();
          if (showOnHover) setHovered(false);
        });
        self.add_controller(motion);

        // onClick logic
        if (onClicked) {
          const click = new Gtk.GestureClick();
          click.connect("pressed", () => {
            const islandBox = self.get_parent();
            let calculatedOffset = 0;
            if (islandBox) {
              const [, buttonBounds] = self.compute_bounds(islandBox);
              const [, islandBounds] = islandBox.compute_bounds(islandBox);

              const posX = buttonBounds.get_x();
              const islandWidth = islandBounds.get_width();

              calculatedOffset = Math.round(
                monitorWidth / 2 + posX - islandWidth / 2,
              );
            }
            onClicked(calculatedOffset);
          });
          self.add_controller(click);
        }
      }}
      css_classes={[
        "module",
        ...(onClicked ? ["clickable-module"] : []),
        ...(cssClasses ?? []),
      ]}
    >
      {content}
    </box>
  );
};
