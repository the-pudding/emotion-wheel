<script>
	import Title from "$components/Title.svelte";
	import Panels from "$components/Panels.svelte";
	import Character from "$components/Character.svelte";
	import Modal from "$components/Gallery.Modal.svelte";
	import { base } from "$app/paths";
	import arrow from "$svg/icons/arrow.svg";
	import { Howl } from "howler";
	import {
		entered,
		scrolled,
		zoomModalImage,
		inModal,
		worldBg,
		scrollMax,
		isScrolling,
		soundOn,
		showPause,
		showInfo,
		currentPanel
	} from "$stores/misc.js";
	import variables from "$data/variables.json";
	import { onDestroy } from "svelte";
	import copy from "$data/copy.json";
	import { scaleLinear } from "d3-scale";
	import mq from "$stores/mq.js";

	export let visible;
	export let innerWidth;
	export let innerHeight;

	let t;
	let containerEl;
	const sound = new Howl({
		src: [`${base}/assets/sound/bg-music.mp3`],
		volume: 0.3,
		loop: true
	});

	const numSteps = copy.steps.length;
	$: progressScale = scaleLinear()
		.domain([0, numSteps - 1])
		.range([0, innerWidth]);

	$: $entered = $scrolled >= $scrollMax;
	$: showInstructions = $currentPanel === 0;
	$: progress = progressScale($currentPanel);
	$: worldInColor = $worldBg === variables.color["sky-blue"];
	$: if ($entered && !sound.playing()) sound.play();
	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);
	$: bgImage = `${base}/assets/img/bg/bg${worldInColor ? "-color" : ""}`;

	/* polling to tell if user is scrolling */
	const onScroll = (e) => {
		$isScrolling = true;
		if (t) clearTimeout(t);
		t = setTimeout(stoppedScrolling, 100);
	};
	const stoppedScrolling = () => {
		$isScrolling = false;
	};

	/* horizontal scroll */
	const onMouseWheel = (e) => {
		if ($inModal) return;

		const leaving = $entered && containerEl.scrollLeft === 0 && e.deltaY < 0;
		if (!$entered || leaving) {
			// if (
			// 	(e.deltaY > 0 && $scrolled < $scrollMax) ||
			// 	(e.deltaY < 0 && $scrolled >= 0)
			// )
			// 	$scrolled += e.deltaY;
		} else if (!$showPause) {
			containerEl.scrollLeft += e.deltaY;
		}
	};

	/* keyboard version */
	const keyDown = (e) => {
		if (document.activeElement.nodeName === "HEX-COLOR-PICKER") return;
		if ($inModal) return;

		// left / right arrows
		if (e.keyCode === 37 || e.keyCode === 39) {
			const delta = e.keyCode === 39 ? 50 : -50;

			const leaving = $entered && containerEl.scrollLeft === 0 && delta < 0;
			if (!$entered || leaving) {
				// if (
				// 	(delta > 0 && $scrolled < $scrollMax) ||
				// 	(delta < 0 && $scrolled >= 0)
				// )
				// 	$scrolled += delta;
			} else if (!$showPause) {
				containerEl.scrollLeft += delta;
			}
		}
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div
	class="story"
	class:visible
	class:entered={$entered}
	class:info-open={$showInfo}
	bind:this={containerEl}
	on:scroll={onScroll}
	on:wheel|preventDefault={onMouseWheel}
	style={`height: ${innerHeight}px; background-color: ${
		$showInfo ? "var(--color-gray-500)" : $worldBg
	}`}
>
	<img
		class="bg-image"
		class:visible
		srcset={`${bgImage}-sm.png 480, ${bgImage}-md.png 950w`}
		sizes={`(max-width: 600px) 480px, 1920px`}
		src={`${bgImage}-md.png`}
		alt="mountains in the background"
	/>
	<div class="play" class:visible={!$showPause}>
		{#if innerHeight}
			<Title />

			<div class="world">
				<Character
					scrollLeft={containerEl ? containerEl.scrollLeft : 0}
					{innerHeight}
				/>
				<Panels {innerHeight} />
			</div>
		{/if}

		<div
			class="progress"
			class:color={worldInColor}
			style:width={`${progress}px`}
		/>

		<div class="instructions" class:visible={showInstructions}>
			<div>{$mq.desktop ? "Scroll down" : "Swipe"} to advance</div>
			<span class="arrow" class:pulse={showInstructions}>{@html arrow}</span>
		</div>

		<Modal />
	</div>

	<div class="pause" class:visible={$showPause}>
		{#each copy.pausePage as text}
			<p>{@html text}</p>
		{/each}
	</div>
</div>

<svelte:window on:keydown={keyDown} />

<style>
	.story {
		position: relative;
		overflow-y: hidden;
		overflow-x: hidden;
		align-items: flex-end;
		transition: background-color calc(var(--1s) * 2),
			background-image calc(var(--1s) * 2), opacity var(--1s);
		background-position-x: center;
		background-position-y: center;
		background-size: cover;
		font-size: var(--24px);
		display: none;
	}
	.story.entered {
		overflow-x: scroll;
	}
	@media (hover: hover) and (pointer: fine) {
		.story {
			overflow-x: hidden;
		}
		.story.entered {
			overflow-x: hidden;
		}
	}

	.story.visible {
		display: flex;
	}
	.story.info-open {
		opacity: 0.6;
	}

	.bg-image {
		display: none;
		object-fit: cover;
		width: 100%;
		height: 100%;
		position: fixed;
	}
	.bg-image.visible {
		display: flex;
	}

	.progress {
		height: 3vh;
		max-height: 30px;
		background: var(--color-gray-300);
		opacity: 0.6;
		position: fixed;
		bottom: 0;
		left: 0;
		transition: all 1s;
	}
	.progress.color {
		background: var(--color-pause);
		opacity: 0.4;
	}

	.world {
		display: flex;
		height: 100%;
		overflow-x: visible;
		flex-shrink: inherit;
	}

	.play {
		opacity: 0;
		transition: opacity 1s;
		height: 100%;
		width: 100%;
	}
	.pause {
		position: fixed;
		z-index: -1;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity 1s;
	}
	.visible {
		opacity: 1;
	}
	.pause.visible {
		z-index: 1;
	}
	.instructions {
		position: fixed;
		right: 2em;
		bottom: 14%;
		align-items: center;
		display: none;
	}
	.instructions.visible {
		display: flex;
	}
	.instructions div {
		margin-right: 12px;
	}
	.instructions .arrow {
		height: 26px;
		max-width: 50px;
	}

	:global(.story span#pause-text) {
		border-bottom: 3px solid var(--color-pause);
	}
	:global(.story p:has(span.callout)) {
		background: #f1ecd1;
		padding: 0.7em 0.4em;
	}

	@media (max-height: 800px) {
		.story {
			font-size: 1.3em;
		}
	}
	@media (max-height: 600px) {
		.story {
			font-size: 1.1em;
		}
	}
</style>
