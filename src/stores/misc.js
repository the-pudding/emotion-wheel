import { writable, readable } from "svelte/store";
import { tweened } from "svelte/motion";

export const scrollMax = readable(400);
export const scrolled = tweened(0, { duration: 0 });
export const isScrolling = writable(false);
export const inModal = writable(false);

export const entered = writable(false);
export const showPlain = writable(false);
export const showPause = writable(false);
export const showInfo = writable(false);

export const currentPanel = writable(undefined);
export const soundOn = writable(true);
export const userMuted = writable(false);

// export const basicFeeling = writable(undefined);
// export const words = writable([]);
// export const colors = writable([]);
// export const bodyDrawing = writable(undefined);
// export const needs = writable([]);

export const basicFeeling = writable("okay");
export const words = writable(["tired", "creative"]);
export const colors = writable(["#ffffff", "#000000"]);
export const bodyDrawing = writable("hi");
export const needs = writable(["this", "that"]);

export const zoomModalImage = writable(undefined);
export const showComments = writable(true);
export const modalAlt = writable("");

export const worldBg = writable("#ffffff");

export const visibleWidth = writable(0);
export const stepWidth = writable(0);
