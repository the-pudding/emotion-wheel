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
		scrollX,
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
			$scrollX = containerEl.scrollLeft;
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
		class="world"
		bind:this={containerEl}
		on:mousewheel|preventDefault={onMouseWheel}
		style={`--backgroundColor: ${$worldBg}`}
	>
		<Title {scrolled} {scrollMax} />

		<div class="before-footer">
			<Character scrollLeft={containerEl ? containerEl.scrollLeft : 0} />
			<Panels />
		</div>

		{#if showFooter}
			<Footer />
		{/if}
	</div>
{/if}

<style>
	.world {
		position: relative;
		overflow-x: hidden;
		display: flex;
		align-items: flex-end;
		height: 100vh;
		transition: background-color 1s;
		background-image: url("assets/img/bg.png");
		background-color: var(--backgroundColor);
	}

	.before-footer {
		display: flex;
		flex-shrink: 0;
		height: 100vh;
	}

	.toggle {
		position: absolute;
		top: 1em;
		right: 1em;
		z-index: 10;
		font-size: var(--14px);
		font-family: var(--sans);
		letter-spacing: normal;
	}
</style>
