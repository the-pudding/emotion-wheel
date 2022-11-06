import { writable } from "svelte/store";

export const mobile = writable(undefined);
export const entered = writable(false);
export const userId = writable(undefined);
export const scrollX = writable(0);
export const panelNum = writable(undefined);

export const basicFeeling = writable(undefined);
export const words = writable([]);
export const colors = writable([]);

export const selectedGalleryImage = writable(undefined);
export const worldBg = writable("#b5bbbb");
export const visibleWidth = writable(0);
