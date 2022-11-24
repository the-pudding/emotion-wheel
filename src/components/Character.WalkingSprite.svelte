<script>
	import { entered, isScrolling, basicFeeling } from "$stores/misc.js";
	import { base } from "$app/paths";
	import mq from "$stores/mq.js";
	import scrollX from "$stores/scrollX.js";
	import { annotate } from "svelte-rough-notation";

	$: bgImage = `url(${base}/assets/img/walk_cycle.png)`;
	$: showInstructions = $scrollX < 500 || !$basicFeeling;

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

<div class="container" class:visible={$entered}>
	<div
		class="instructions"
		class:visible={showInstructions}
		use:annotate={{
			type: "box",
			animate: false,
			visible: showInstructions,
			color: "black",
			padding: 0
		}}
	>
		<strong>Scroll up + down</strong> to move me (or use the keyboard
		<span class="key">{"<"}</span><span class="key">{">"}</span>)
	</div>
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
		left: 4em;
		bottom: 6%;
		z-index: 1;
		opacity: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.instructions {
		opacity: 0;
		transition: opacity 1s;
		font-family: var(--sans);
		font-size: var(--14px);
		text-align: center;
		background: white;
		max-width: 220px;
		padding: 1em;
		position: absolute;
		top: 0;
		transform: translate(0, -120%);
	}
	.visible {
		opacity: 1;
	}
	.key {
		width: 1.5em;
		height: 1.6em;
		border: 1px solid var(--color-gray-800);
		border-radius: 5px;
		border-top: 0.5px solid var(--color-gray-500);
		border-left: 1px solid var(--color-gray-700);
		border-right: 1px solid var(--color-gray-700);
		border-bottom: 3px solid var(--color-gray-800);
		display: inline-block;
	}
	@media (max-height: 600px) {
		.instructions {
			font-size: var(--12px);
		}
	}
</style>
