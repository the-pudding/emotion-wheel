<script>
	import Toggle from "$components/helpers/Toggle.svelte";
	import Plain from "$components/Plain.svelte";
	import Title from "$components/Title.svelte";
	import Content from "$components/Content.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Character from "$components/Character.svelte";
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import {
		entered,
		basicFeeling,
		words,
		colors,
		scrollX,
		selectedGalleryImage,
		worldBg
	} from "$stores/misc.js";
	import { onMount } from "svelte";

	let containerEl;
	let value;
	let toggleValue = "off";

	let scrolled = 0;
	const scrollMax = 400;
	$: $entered = scrolled >= scrollMax;
	$: showFooter = $basicFeeling && $words.length > 0 && $colors.length > 0;
	$: surveyNeeded = !$basicFeeling
		? "survey-basic"
		: $words.length <= 0
		? "survey-words"
		: $colors.length <= 0
		? "survey-color"
		: null;
	$: stopIndex = !surveyNeeded
		? copy.steps.length
		: copy.steps.findIndex((d) => d.id === surveyNeeded) + 1;
	$: visibleSteps = copy.steps.map((d, i) => ({ ...d, i })).slice(0, stopIndex);

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
		style:background={$worldBg}
	>
		<Title {scrolled} {scrollMax} />

		<div class="before-footer">
			<Character scrollLeft={containerEl ? containerEl.scrollLeft : 0} />

			<Scrolly bind:value>
				{#each visibleSteps as step}
					<div class="step" class:visible={$entered}>
						<img src="assets/img/ground.png" class="full-panel" />

						{#if step.id === "not-okay"}
							<img
								src="assets/img/bubbles.png"
								class="full-panel"
								style="position: absolute"
							/>
						{/if}
						<Content {step} scrollValue={value} />
					</div>
				{/each}
			</Scrolly>
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
	}
	.before-footer {
		display: flex;
		flex-shrink: 0;
		height: 100vh;
	}
	.step {
		position: relative;
		margin: 0;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		min-width: 100vw;
		opacity: 0;
		transition: opacity 1s;
	}
	.visible {
		opacity: 1;
	}
	.full-panel {
		height: 100vh;
		max-width: none;
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
