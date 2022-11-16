import { writable, readable } from "svelte/store";

export const scrollMax = readable(400);
export const scrolled = writable(0);
export const entered = writable(false);

export const userId = writable(undefined); // TODO: delete
export const currentPanel = writable(undefined);
export const soundOn = writable(true);

export const basicFeeling = writable(undefined);
export const words = writable([]);
export const colors = writable([]);
export const bodyDrawing = writable(undefined);
export const needs = writable([]);

export const selectedGalleryImage = writable(undefined);
export const worldBg = writable("#b5bbbb");

export const visibleWidth = writable(0);
export const stepWidth = writable(0);
