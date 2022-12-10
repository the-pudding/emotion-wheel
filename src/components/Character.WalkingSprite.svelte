<script>
	import { entered, isScrolling, currentPanel } from "$stores/misc.js";
	import { base } from "$app/paths";
	import mq from "$stores/mq.js";
	import { annotate } from "svelte-rough-notation";

	export let width;

	$: bgImage = `url(${base}/assets/img/walk_cycle.png)`;
	$: showInstructions = $currentPanel === 0;

	let cycleInterval;
	const imageW = 568;
	const imageH = 353;
	$: width = $mq.sm ? imageW / 4 : $mq.md ? imageW / 3 : imageW / 2;
	$: height = $mq.sm ? imageH / 4 : $mq.md ? imageH / 3 : imageH / 2;
	const numFrames = 9;
	const frameRate = 100;

	let i = 0;

	$: if ($isScrolling && !$mq.reducedMotion) cycle();
	$: if (!$isScrolling && !$mq.reducedMotion) stop();

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

<div class="container" class:visible={$entered}>
	<div
		class="image"
		style={`width: ${width}px; height: ${height}px; background-image: ${bgImage}; background-position: ${
			i * -1 * width
		}px 0px; background-size: ${numFrames * 100}% 100%`}
	/>
</div>

<style>
	.container {
		position: fixed;
		left: 0;
		bottom: 6%;
		transform: translate(35%, 0);
		z-index: 1;
		opacity: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.visible {
		opacity: 1;
	}
</style>
