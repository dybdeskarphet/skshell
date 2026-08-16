import Gdk from "gi://Gdk?version=4.0";
import { IslandContext } from "../../store/islandContext";
import Astal from "gi://Astal?version=4.0";
import Gtk from "gi://Gtk?version=4.0";
import { Module } from "../templates/Module";
import { Battery } from "../modules/Battery";

export const IslandPopup = (gdkmonitor: Gdk.Monitor) => {
  const { islandOpen, keepOpen, scheduleClose, closeImmediately } =
    IslandContext.use();

  return (
    <window
      visible
      name={`island-popup-${gdkmonitor.get_connector()}`}
      gdkmonitor={gdkmonitor}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={Astal.WindowAnchor.TOP}
      marginTop={8}
      $={(self) => {
        const motion = new Gtk.EventControllerMotion();
        motion.connect("enter", () => keepOpen());
        motion.connect("leave", () => scheduleClose());
        self.add_controller(motion);
        self.connect("destroy", () => closeImmediately());
      }}
    >
      <revealer
        reveal_child={islandOpen}
        transition_type={Gtk.RevealerTransitionType.FADE_SLIDE_DOWN}
        transition_duration={250}
      >
        <box css_classes={["island-popup"]} halign={Gtk.Align.CENTER}>
          <Battery />
        </box>
      </revealer>
    </window>
  );
};
