<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Basic from "$components/Interactive.Basic.svelte";
	import Words from "$components/Interactive.Words.svelte";
	import Color from "$components/Interactive.Color.svelte";
	import Body from "$components/Interactive.Body.svelte";
	import Gallery from "$components/Gallery.svelte";
	import RollingWheel from "$components/Panels.RollingWheel.svelte";
	import Text from "$components/Panels.Text.svelte";
	import {
		basicFeeling,
		colors,
		words,
		currentPanel,
		entered
	} from "$stores/misc.js";
	import copy from "$data/copy.json";
	import { tick } from "svelte";

	let scrollyEl;

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
	$: if (scrollyEl) refreshNodes(visibleSteps);

	const refreshNodes = async () => {
		await tick();
		scrollyEl.refreshNodes(visibleSteps);
	};

	const noBg = [
		"survey-words",
		"survey-color",
		"survey-body",
		"try-wheel",
		"granularity",
		"color",
		"body",
		"fascinating",
		"brene",
		"final-wheel",
		"visual-language",
		"gallery",
		"closing"
	];
	const hasOverlay = ["core", "body-color"];
</script>

<Scrolly bind:value={$currentPanel} bind:this={scrollyEl}>
	{#each visibleSteps as { id, text }, i}
		{@const panelBg = noBg.includes(id) ? "ground" : id}
		<div class="step" class:visible={$entered} {id}>
			<!-- background -->
			<img src={`assets/img/panels/${panelBg}.png`} class="full-panel" />
			{#if hasOverlay.includes(id)}
				<img
					src={`assets/img/panels/${panelBg}2.png`}
					class="full-panel overlay"
					class:visible={$currentPanel === i}
				/>
			{/if}

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
				<Text {i} {text} />
			{/if}

			<!-- extras -->
			{#if id === "try-wheel"}
				<RollingWheel img={"grey_wheel_blank.png"} {i} />
			{:else if id === "granularity"}
				<img class="simple-wheel" src={`assets/img/grey_wheel.png`} />
			{:else if id === "color"}
				<RollingWheel img={"simple_wheel_color.png"} {i} />
			{:else if id === "body"}
				<img class="body-diagram" src={`assets/img/blank_body.png`} />
			{:else if id === "final-wheel"}
				<RollingWheel img={"final_wheel.png"} {i} />
			{/if}
		</div>
	{/each}
</Scrolly>

<style>
	.steps {
		display: flex;
		transform: translate(-235px, 0);
	}
	.step.visible {
		opacity: 1;
	}
	.step {
		position: relative;
		margin: 0;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		min-width: 100vw;
		transition: opacity 1s;
		opacity: 0;
	}

	.full-panel {
		height: 100%;
		max-width: none;
	}
	.overlay {
		position: absolute;
		top: 0;
		opacity: 0;
		transition: opacity 2.5s 1s;
	}
	.overlay.visible {
		opacity: 1;
	}
	img.simple-wheel {
		position: absolute;
		bottom: 3em;
		left: 40vw;
		width: 30%;
	}

	img.body-diagram {
		position: absolute;
		height: 50vh;
		left: 40%;
	}
</style>
