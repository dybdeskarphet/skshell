import GLib from "gi://GLib?version=2.0";
import { createPoll } from "../../utils/pausable";

export class ClockService {
  private static instance: ClockService;

  public now = createPoll(GLib.DateTime.new_now_local(), 1000, () => {
    return GLib.DateTime.new_now_local();
  });

  public time = this.now.as((t) => t.format("%H:%M") ?? "...");
  public timeWithSeconds = this.now.as((t) => t.format("%H:%M:%S") ?? "...");
  public date = this.now.as((t) => t.format("%F") ?? "...");

  public static get_default() {
    return (this.instance ??= new ClockService());
  }
}

export const clockService = ClockService.get_default();
