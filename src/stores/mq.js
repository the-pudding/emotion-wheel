import { browser } from "$app/environment";
import { readable } from "svelte/store";

const queries = {
	sm: "(max-height: 640px)",
	md: "(max-height: 768px)",
	lg: "(max-height: 1024px)",
	xl: "(max-height: 1280px)",
	reducedMotion: "(prefers-reduced-motion: reduce)",
	desktop: "(hover: hover) and (pointer: fine)"
};

function calculateMedia(mqls) {
	const media = { classNames: "" };
	const mediaClasses = [];
	for (let name in mqls) {
		media[name] = mqls[name].matches;
		if (media[name]) mediaClasses.push(`mq-${name}`);
	}
	media.classNames = mediaClasses.join(" ");
	return media;
}

export default readable({}, (set) => {
	if (!browser) return;
	const mqls = {};
	const onChange = () => set(calculateMedia(mqls));

	if (browser) {
		for (let q in queries) {
			mqls[q] = window.matchMedia(queries[q]);
			mqls[q].addListener(onChange);
		}

		onChange();
	}

	return () => {
		for (let q in mqls) {
			mqls[q].removeListener(onChange);
		}
	};
});
