import app from "ags/gtk4/app";
import style from "./style.css";
import { IslandWindow } from "./widget/Island";

app.start({
  css: style,
  main() {
    app.get_monitors().map(IslandWindow);
  },
});
