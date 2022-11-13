import { writable } from "svelte/store";

export const entered = writable(false);
export const userId = writable(undefined);
export const currentPanel = writable(undefined);
export const soundOn = writable(true);

export const basicFeeling = writable(undefined);
export const words = writable([]);
export const colors = writable([]);
export const needs = writable([]);

export const selectedGalleryImage = writable(undefined);
export const worldBg = writable("#b5bbbb");
export const visibleWidth = writable(0);
