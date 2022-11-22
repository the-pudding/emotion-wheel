<script>
	import Title from "$components/Title.svelte";
	import Panels from "$components/Panels.svelte";
	import Character from "$components/Character.svelte";
	import Modal from "$components/Gallery.Modal.svelte";
	import { base } from "$app/paths";
	import {
		entered,
		scrolled,
		selectedGalleryImage,
		worldBg,
		scrollMax,
		isScrolling
	} from "$stores/misc.js";
	import variables from "$data/variables.json";

	export let innerHeight;

	let t;
	let containerEl;

	$: bgImage = `${base}/assets/img/bg${
		$worldBg === variables.color["sky-blue"] ? "-color" : ""
	}.png`;

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
		if ($selectedGalleryImage) return;

		const leaving = $entered && containerEl.scrollLeft === 0 && e.deltaY < 0;
		if (!$entered || leaving) {
			if (
				(e.deltaY > 0 && $scrolled < $scrollMax) ||
				(e.deltaY < 0 && $scrolled >= 0)
			)
				$scrolled += e.deltaY;
		} else {
			containerEl.scrollLeft += e.deltaY;
		}
	};

	/* keyboard version */
	const keyDown = (e) => {
		if (document.activeElement.nodeName === "HEX-COLOR-PICKER") return;
		if ($selectedGalleryImage) return;

		// left / right arrows
		if (e.keyCode === 37 || e.keyCode === 39) {
			const delta = e.keyCode === 39 ? 100 : -100;

			const leaving = $entered && containerEl.scrollLeft === 0 && delta < 0;
			if (!$entered || leaving) {
				if (
					(delta > 0 && $scrolled < $scrollMax) ||
					(delta < 0 && $scrolled >= 0)
				)
					$scrolled += delta;
			} else {
				containerEl.scrollLeft += delta;
			}
		}
	};
</script>

<div
	class="story"
	class:entered={$entered}
	bind:this={containerEl}
	on:scroll={onScroll}
	on:mousewheel|preventDefault={onMouseWheel}
	style:height={`${innerHeight}px`}
	style:background-color={$worldBg}
	style:background-image={`url(${bgImage})`}
>
	{#if innerHeight}
		<Title />
	{/if}

	<div class="world">
		<Character scrollLeft={containerEl ? containerEl.scrollLeft : 0} />
		<Panels {innerHeight} />
	</div>

	<Modal />
</div>

<svelte:window on:keydown={keyDown} />

<style>
	.story {
		position: relative;
		overflow-y: hidden;
		overflow-x: hidden;
		display: flex;
		align-items: flex-end;
		transition: background-color 2s, background-image 2s;
		background-position-x: center;
		background-position-y: center;
		font-size: 24px;
	}
	.story.entered {
		overflow-x: scroll;
	}
	.world {
		display: flex;
		height: 100%;
		overflow-x: visible;
		flex-shrink: inherit;
	}

	@media (max-height: 600px) {
		.story {
			font-size: var(--14px);
		}
	}
</style>
