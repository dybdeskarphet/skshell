import Gdk from "gi://Gdk?version=4.0";
import { IslandContext } from "../../store/islandContext";
import Astal from "gi://Astal?version=4.0";
import Gtk from "gi://Gtk?version=4.0";

export const Hotspot = (gdkmonitor: Gdk.Monitor) => {
  const { keepOpen, scheduleClose, closeImmediately } = IslandContext.use();

  return (
    <window
      visible
      name={`island-hotspot-${gdkmonitor.get_connector()}`}
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.TOP}
      canTarget={true}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={Astal.WindowAnchor.TOP}
      $={(self) => {
        const motion = new Gtk.EventControllerMotion();
        motion.connect("enter", () => keepOpen());
        motion.connect("leave", () => scheduleClose());
        self.add_controller(motion);
        self.connect("destroy", () => closeImmediately());
      }}
    >
      <box css_classes={["island-hotspot"]} />
    </window>
  );
};
