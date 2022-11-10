<script>
	import { base } from "$app/paths";
	import Toggle from "$components/helpers/Toggle.svelte";
	import Plain from "$components/Plain.svelte";
	import Title from "$components/Title.svelte";
	import Panels from "$components/Panels.svelte";
	import Character from "$components/Character.svelte";
	import Footer from "$components/Footer.svelte";
	import Modal from "$components/Gallery.Modal.svelte";
	import {
		entered,
		basicFeeling,
		words,
		colors,
		selectedGalleryImage,
		worldBg,
		soundOn
	} from "$stores/misc.js";

	let containerEl;
	let toggleValue = "off";
	let scrolled = 0;
	const scrollMax = 400;
	let innerHeight;

	$: $entered = scrolled >= scrollMax;
	$: showFooter = $basicFeeling && $words.length > 0 && $colors.length > 0;
	$: bgImage = `${base}/assets/img/bg.png`;

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

	const mute = () => {
		$soundOn = !$soundOn;
	};
</script>

<div class="top-bar">
	<button class="mute" on:click={mute}>{$soundOn ? "Mute" : "Unmute"}</button>
	<Toggle label="Text Version" style="inner" bind:value={toggleValue} />
</div>

{#if toggleValue === "on"}
	<Plain />
{:else}
	<div
		class="everything"
		bind:this={containerEl}
		on:mousewheel|preventDefault={onMouseWheel}
		style={`--height: ${innerHeight}px; --backgroundColor: ${$worldBg}; background-image: url(${bgImage})`}
	>
		<Title bind:scrolled {scrollMax} />

		<div class="world">
			<Character scrollLeft={containerEl ? containerEl.scrollLeft : 0} />
			<Panels />
		</div>

		<Modal />

		{#if showFooter}
			<Footer />
		{/if}
	</div>
{/if}
<svelte:window bind:innerHeight />

<style>
	.everything {
		position: relative;
		overflow-x: scroll;
		display: flex;
		align-items: flex-end;
		height: var(--height);
		transition: background-color 1s;
		background-color: var(--backgroundColor);
		font-size: 14px;
	}

	.world {
		display: flex;
		height: 100%;
		flex-shrink: 0;
	}

	.top-bar {
		display: flex;
		align-items: center;
		position: absolute;
		top: 1em;
		right: 1em;
		z-index: 10;
		font-size: var(--12px);
		font-family: var(--sans);
		letter-spacing: normal;
	}

	.mute {
		background: none;
		text-decoration: underline;
		font-family: var(--sans);
		margin-right: 1em;
	}
	.mute:hover {
		font-weight: bold;
	}

	@media (hover: hover) and (pointer: fine) {
		.everything {
			font-size: 24px;
			overflow-x: hidden;
			height: 100vh;
		}
		.world {
			overflow-x: visible;
			flex-shrink: inherit;
		}
		.top-bar {
			font-size: var(--14px);
		}
	}
</style>
