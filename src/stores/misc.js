import { writable } from "svelte/store";

export const userId = writable(undefined);
export const basicFeeling = writable(undefined);
export const words = writable([]);
export const colors = writable([]);
