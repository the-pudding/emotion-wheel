<script>
	import Toggle from "$components/helpers/Toggle.svelte";
	import Plain from "$components/Plain.svelte";
	import Title from "$components/Title.svelte";
	import Panels from "$components/Panels.svelte";
	import Character from "$components/Character.svelte";
	import Footer from "$components/Footer.svelte";
	import {
		entered,
		basicFeeling,
		words,
		colors,
		selectedGalleryImage,
		worldBg
	} from "$stores/misc.js";

	let containerEl;
	let toggleValue = "off";
	let scrolled = 0;
	const scrollMax = 400;

	$: $entered = scrolled >= scrollMax;
	$: showFooter = $basicFeeling && $words.length > 0 && $colors.length > 0;

	const onMouseWheel = (e) => {
		if ($selectedGalleryImage) return;

		const leaving = $entered && containerEl.scrollLeft === 0 && e.deltaY < 0;
		if (!$entered || leaving) {
			if (
				(e.deltaY > 0 && scrolled < scrollMax) ||
				(e.deltaY < 0 && scrolled >= 0)
			)
				scrolled += e.deltaY;
		} else {
			containerEl.scrollLeft += e.deltaY;
		}
	};

	// mobile scroll
	let start;
	let scrollLeft;
	const onTouchStart = (e) => {
		start = e.changedTouches[0].pageX;
	};
	const onTouchMove = (e) => {
		const current = e.changedTouches[0].pageX;
		scrollLeft = start - current;

		const leaving = $entered && containerEl.scrollLeft === 0 && scrollLeft < 0;
		if (!$entered || leaving) {
			if (
				(scrollLeft > 0 && scrolled < scrollMax) ||
				(scrollLeft < 0 && scrolled >= 0)
			)
				scrolled += scrollLeft / 50;
		} else {
			containerEl.scrollLeft += scrollLeft;
		}
	};
</script>

<div class="toggle">
	<Toggle label="Text Version" style="inner" bind:value={toggleValue} />
</div>

{#if toggleValue === "on"}
	<Plain />
{:else}
	<div
		class="everything"
		bind:this={containerEl}
		on:mousewheel|preventDefault={onMouseWheel}
		on:touchstart={onTouchStart}
		on:touchmove={onTouchMove}
		style={`--backgroundColor: ${$worldBg}`}
	>
		<Title {scrolled} {scrollMax} />

		<div class="world">
			<Character scrollLeft={containerEl ? containerEl.scrollLeft : 0} />
			<Panels />
		</div>

		{#if showFooter}
			<Footer />
		{/if}
	</div>
{/if}

<style>
	.everything {
		position: relative;
		overflow-x: hidden;
		display: flex;
		align-items: flex-end;
		height: 100vh;
		transition: background-color 1s;
		background-image: url("assets/img/bg.png");
		background-color: var(--backgroundColor);
		font-size: 14px;
	}

	.world {
		display: flex;
		height: 100vh;
		overflow-x: scroll;
		flex-shrink: 0;
	}

	.toggle {
		position: absolute;
		top: 1em;
		right: 1em;
		z-index: 10;
		font-size: var(--12px);
		font-family: var(--sans);
		letter-spacing: normal;
	}

	@media (hover: hover) and (pointer: fine) {
		.story {
			font-size: 24px;
		}
		.world {
			overflow-x: visible;
		}
		.toggle {
			font-size: var(--14px);
		}
	}
</style>
