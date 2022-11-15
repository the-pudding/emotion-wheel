<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Basic from "$components/Interactive.Basic.svelte";
	import Words from "$components/Interactive.Words.svelte";
	import Color from "$components/Interactive.Color.svelte";
	import Body from "$components/Interactive.Body.svelte";
	import Needs from "$components/Interactive.Needs.svelte";
	import Gallery from "$components/Gallery.svelte";
	import Resources from "$components/Resources.svelte";
	import RollingWheel from "$components/Panels.RollingWheel.svelte";
	import Summary from "$components/Summary.svelte";
	import Text from "$components/Panels.Text.svelte";
	import {
		basicFeeling,
		colors,
		words,
		bodyDrawing,
		needs,
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
		: !$bodyDrawing
		? "survey-body"
		: $needs.length <= 0
		? "survey-needs"
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
		"try-wheel",
		"color",
		"body",
		"brene",
		"final-wheel",
		"let-go",
		"gallery",
		"resources"
	];
	const hasOverlay = ["core", "body-color"];
</script>

<Scrolly bind:value={$currentPanel} bind:this={scrollyEl}>
	{#each visibleSteps as { id, text }, i}
		{@const panelBg = noBg.includes(id)
			? "ground"
			: id.includes("survey") && id !== "survey-needs"
			? `${"survey-basic"}-${surveyNeeded === id ? "pre" : "post"}`
			: id}
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

			<!-- extra ground -->
			<!-- {#if id === "survey-basic"}
				<img
					src={`assets/img/panels/ground.png`}
					class="full-panel extra-ground"
				/>
			{/if} -->

			<!-- text + content -->
			{#if id === "survey-basic"}
				<Basic {text} />
			{:else if id === "survey-words"}
				<Words {text} />
			{:else if id === "survey-color"}
				<Color {text} />
			{:else if id === "survey-body"}
				<Body {text} />
			{:else if id === "survey-needs"}
				<Needs {text} />
			{:else if id === "let-go"}
				<Summary {text} />
			{:else if id === "gallery"}
				<Gallery />
			{:else if id === "resources"}
				<Resources {text} />
			{:else if text && text.length}
				<!-- just words -->
				<Text {i} {text} />
			{/if}

			<!-- just content -->
			{#if id === "try-wheel"}
				<RollingWheel img={"grey_wheel_blank.png"} {i} />
			{:else if id === "granularity"}
				<img class="simple-wheel" src={`assets/img/grey_wheel.png`} />
			{:else if id === "color"}
				<RollingWheel img={"simple_wheel_color.png"} {i} />
			{:else if id === "body"}
				<img
					class="body-diagram visible"
					src={`assets/img/blank_body_cloud.png`}
				/>
				<img
					class="body-diagram"
					class:visible={$currentPanel === i}
					src={`assets/img/abby_body_drawing.png`}
				/>
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
		transition: opacity 1s;
		opacity: 0;
		/* background: lightblue;
		border: 4px solid black; */
	}
	.step:first-of-type {
		width: 100vw;
	}
	.extra-ground {
		position: absolute;
		right: 0;
		display: block;
	}

	.full-panel {
		height: 100%;
		max-width: 100vw;
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
		bottom: 1.7em;
		left: 35vw;
		width: 210px;
	}

	img.body-diagram {
		position: absolute;
		left: 20em;
		height: 200px;
		opacity: 0;
		transition: opacity 2s;
		transition-delay: 2s;
	}
	.body-diagram.visible {
		opacity: 1;
	}

	@media (hover: hover) and (pointer: fine) {
		img.simple-wheel {
			bottom: 3em;
			left: 40vw;
			width: 480px;
		}
		img.body-diagram {
			height: 50vh;
			left: 40%;
		}
	}
</style>
