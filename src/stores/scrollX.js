import { browser } from "$app/environment";
import { readable } from "svelte/store";

export default readable(0, (set) => {
	let ticking = false;
	let lastScrollX = 0;

	const updateScrollX = () => {
		set(lastScrollX);
		ticking = false;
	};

	const onScroll = () => {
		lastScrollX = document.querySelector("div.everything").scrollLeft;
		if (!ticking) {
			requestAnimationFrame(updateScrollX);
			ticking = true;
		}
	};

	if (browser)
		document
			.querySelector("div.everything")
			.addEventListener("scroll", onScroll);

	return () => {
		if (browser) {
			document
				.querySelector("div.everything")
				.removeEventListener("scroll", onScroll);
		}
	};
});
