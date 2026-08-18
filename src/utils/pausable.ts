import GObject from "gi://GObject?version=2.0";
import {
  Accessor,
  createEffect,
  createExternal,
  createRoot,
  createState,
} from "gnim";

export const createPausableBinding = <
  T extends GObject.Object,
  K extends keyof T & string,
>(
  object: T | null | undefined,
  property: K,
  isActive: Accessor<boolean>,
  fallback: T[K],
): Accessor<T[K]> => {
  const [state, setState] = createState<T[K]>(
    object ? object[property] : (fallback as T[K]),
  );

  createRoot(() => {
    createEffect(() => {
      if (!object || !isActive()) return;

      setState(object[property]);

      const id = object.connect(`notify::${property}`, () => {
        setState(object[property]);
      });

      return () => {
        object.disconnect(id);
      };
    });
  });

  return state;
};

export const createPoll = <T>(
  init: T,
  intervalMs: number,
  fn: () => T,
): Accessor<T> => {
  return createExternal(init, (set) => {
    set(fn());

    const id = setInterval(() => set(fn()), intervalMs);

    return () => clearInterval(id);
  });
};
