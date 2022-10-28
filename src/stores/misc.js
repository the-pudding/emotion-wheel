import { writable } from "svelte/store";

export const entered = writable(false);
export const userId = writable(undefined);
export const scrollX = writable(0);

// export const basicFeeling = writable(undefined);
// export const words = writable([]);
// export const colors = writable([]);

export const basicFeeling = writable("ok");
export const words = writable(["happy", "sad"]);
export const colors = writable([]);

export const selectedGalleryImage = writable(undefined);
