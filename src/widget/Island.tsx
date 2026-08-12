import { Gtk, Gdk, Astal } from "ags/gtk4";
import { createIslandState, IslandContext } from "../store/islandContext";

export const IslandWidget = () => {
  const { islandOpen, setIslandOpen } = IslandContext.use();

  return (
    <box
      cssClasses={["island-box"]}
      $={(self) => {
        const motion = new Gtk.EventControllerMotion();
        motion.connect("enter", () => setIslandOpen(true));
        motion.connect("leave", () => setIslandOpen(false));
        self.add_controller(motion);
      }}
    >
      <revealer reveal_child={islandOpen}>
        <box cssClasses={["island-revealer-box"]}>
          <label label={"Hey"} />
        </box>
      </revealer>
    </box>
  );
};

export const IslandWindow = (gdkmonitor: Gdk.Monitor) => {
  const islandState = createIslandState();

  return (
    <IslandContext value={islandState}>
      {() => (
        <window
          visible
          name={`island-${gdkmonitor.get_connector()}`}
          gdkmonitor={gdkmonitor}
          exclusivity={Astal.Exclusivity.EXCLUSIVE}
          anchor={Astal.WindowAnchor.TOP}
        >
          <IslandWidget />
        </window>
      )}
    </IslandContext>
  );
};
