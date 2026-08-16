import Gtk from "gi://Gtk?version=4.0";
import { Accessor, createState } from "gnim";
import { IslandContext } from "../../store/islandContext";

interface ModuleProps {
  icon?: string | Accessor<string>;
  text?: string | Accessor<string>;
  showOnHover?: boolean;
  onClicked?: () => void;
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
  const { keepOpen, scheduleClose } = IslandContext.use();

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

  if (onClicked) {
    return (
      <button
        $={(self) => {
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
        }}
        onClicked={onClicked}
        css_classes={["module", "clickable", ...(cssClasses ?? [])]}
      >
        {content}
      </button>
    );
  }

  return (
    <box
      $={(self) => {
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
      }}
      css_classes={["module", ...(cssClasses ?? [])]}
    >
      {content}
    </box>
  );
};
