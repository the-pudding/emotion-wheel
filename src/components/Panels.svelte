<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Basic from "$components/Interactive.Basic.svelte";
	import Words from "$components/Interactive.Words.svelte";
	import Color from "$components/Interactive.Color.svelte";
	import Body from "$components/Interactive.Body.svelte";
	import Gallery from "$components/Gallery.svelte";
	import Text from "$components/Panels.Text.svelte";
	import {
		panelNum,
		basicFeeling,
		colors,
		words,
		entered
	} from "$stores/misc.js";
	import copy from "$data/copy.json";

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
</script>

<!-- <Scrolly bind:value={$panelNum}> -->
<div class="steps">
	{#each visibleSteps as { id, text }}
		{@const panelBg =
			id.includes("survey") ||
			id === "show-you" ||
			id === "try-wheel" ||
			id === "granularity" ||
			id === "color"
				? "ground"
				: id}
		<div class="step" class:visible={$entered}>
			<!-- background -->
			<img src={`assets/img/panels/${panelBg}.png`} class="full-panel" />

			<!-- survey -->
			{#if id === "survey-basic"}
				<Basic />
			{:else if id === "survey-words"}
				<Words />
			{:else if id === "survey-color"}
				<Color />
			{:else if id === "survey-body"}
				<Body />
			{:else if id === "gallery"}
				<Gallery />
			{:else}
				<!-- or just words -->
				<Text {text} />
			{/if}

			<!-- extras -->
			{#if $panelNum === 6 && id === "try-wheel"}
				<img
					class="simple-wheel roll-in"
					src={`assets/img/grey_wheel_blank.png`}
				/>
			{:else if id === "granularity"}
				<img class="simple-wheel" src={`assets/img/grey_wheel.png`} />
			{:else if id === "color"}
				<img class="simple-wheel" src={`assets/img/simple_wheel_color.png`} />
			{/if}
		</div>
	{/each}
</div>

<style>
	.steps {
		display: flex;
		transform: translate(-235px, 0);
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
	.step.visible {
		opacity: 1;
	}
	.full-panel {
		height: 100vh;
		max-width: none;
	}
	img.simple-wheel {
		position: absolute;
		bottom: 3em;
		left: 40vw;
		width: 30%;
	}
	img.roll-in {
		animation: spin 4s linear;
	}

	@keyframes spin {
		0% {
			left: 100%;
			transform: rotate(0deg);
		}
		100% {
			left: 30vw;
			transform: rotate(360deg);
		}
	}
</style>
