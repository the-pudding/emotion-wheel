<script>
	import { entered, isScrolling } from "$stores/misc.js";
	import { base } from "$app/paths";
	import mq from "$stores/mq.js";

	$: bgImage = `url(${base}/assets/img/walk_cycle.png)`;

	let cycleInterval;
	const imageW = 568;
	const imageH = 353;
	const width = $mq.sm ? imageW / 4 : imageW / 2;
	const height = $mq.sm ? imageH / 4 : imageH / 2;
	const numFrames = 9;
	const frameRate = 100;

	let i = 0;

	$: if ($isScrolling) cycle();
	$: if (!$isScrolling) stop();

	const cycle = () => {
		cycleInterval = setInterval(() => {
			if (i < numFrames - 1) {
				i += 1;
			} else {
				i = 0;
			}
		}, frameRate);
	};
	const stop = () => {
		if (cycleInterval) clearInterval(cycleInterval);
		i = 0;
	};
</script>

<div
	class:visible={$entered}
	style={`width: ${width}px; height: ${height}px; background-image: ${bgImage}; background-position: ${
		i * -1 * width
	}px 0px; background-size: ${numFrames * 100}% 100%`}
/>

<style>
	div {
		position: fixed;
		left: 4em;
		bottom: 6%;
		z-index: 1;
		opacity: 0;
	}
	.visible {
		opacity: 1;
	}
	@media (max-height: 600px) {
		div {
			height: 75px;
		}
	}
</style>
