import app from "ags/gtk4/app";
import style from "./style.gtk.css";
import colors from "./colors.gtk.css";
import { Island } from "./widget/Island";
import Adw from "gi://Adw?version=1";
import { createRoot } from "gnim";
import { activeIslandStates } from "./store/islandRegistry";

Adw.StyleManager.get_default().set_color_scheme(Adw.ColorScheme.FORCE_DARK);

app.start({
  css: `${colors}\n${style}`,
  main() {
    app.get_monitors().map(Island);
    app.connect("notify::monitors", () => {
      const existingWindowNames = app.windows.map((w) => w.name);

      app.get_monitors().forEach((monitor) => {
        const hotspotName = `island-hotspot-${monitor.get_connector()}`;
        if (!existingWindowNames.includes(hotspotName)) {
          createRoot(() => {
            Island(monitor);
          });
        }
      });
    });
  },
  requestHandler(argv: string[], res: (response: any) => void) {
    const command = argv[0];

    if (command === "open") {
      activeIslandStates.forEach((island) => {
        island.keepOpen();
        island.scheduleClose(5000);
      });
      return res("Opened");
    }

    return res("Unknown command");
  },
});
