import { Accessor } from "gnim";
import { MaybeAccessor } from "../../../types";
import Gtk from "gi://Gtk?version=4.0";

interface BigLabelProps {
  label: MaybeAccessor<string>;
  icon?: MaybeAccessor<string>;
  footer?: MaybeAccessor<string>;
  withBackground?: boolean;
}
export const BigLabel = ({
  icon,
  label,
  footer,
  withBackground = false,
}: BigLabelProps) => {
  return (
    <box
      css_classes={[
        "menu-big-label",
        ...(withBackground ? ["menu-big-label-background"] : []),
      ]}
      orientation={Gtk.Orientation.HORIZONTAL}
    >
      <box hexpand={true} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
        {icon && (
          <>
            <label
              css_classes={["menu-big-label-icon"]}
              label={icon}
              valign={Gtk.Align.CENTER}
            />
            <box width_request={8} />
          </>
        )}
        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
          <label css_classes={["menu-big-label-label"]} label={label} />
          {footer && (
            <label css_classes={["menu-big-label-footer"]} label={footer} />
          )}
        </box>
      </box>
    </box>
  );
};
