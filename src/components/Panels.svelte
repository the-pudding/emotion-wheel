<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Basic from "$components/Interactive.Basic.svelte";
	import Words from "$components/Interactive.Words.svelte";
	import Color from "$components/Interactive.Color.svelte";
	import Body from "$components/Interactive.Body.svelte";
	import Needs from "$components/Interactive.Needs.svelte";
	import Gallery from "$components/Gallery.svelte";
	import Resources from "$components/Resources.svelte";
	import BodyDemo from "$components/Panels.BodyDemo.svelte";
	import RollingWheel from "$components/Panels.RollingWheel.svelte";
	import Summary from "$components/Summary.svelte";
	import Text from "$components/Panels.Text.svelte";
	import Footer from "$components/Footer.svelte";
	import {
		basicFeeling,
		colors,
		words,
		bodyDrawing,
		needs,
		currentPanel,
		entered,
		stepWidth,
		visibleWidth
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
	$: $visibleWidth = visibleSteps.length * $stepWidth;
	$: showFooter =
		$basicFeeling &&
		$words.length > 0 &&
		$colors.length > 0 &&
		$needs.length > 0;
	$: if (scrollyEl) refreshNodes(visibleSteps);

	const refreshNodes = async () => {
		await tick();
		scrollyEl.refreshNodes(visibleSteps);
	};

	const noBg = [
		"try-wheel",
		"granularity",
		"fascinating",
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
			? `${id}-${surveyNeeded === id ? "pre" : "post"}`
			: id}
		<div
			class="step"
			class:visible={$entered}
			{id}
			style:width={`${$stepWidth}px`}
		>
			<img src={`assets/img/panels/${panelBg}.png`} class="full-panel" />

			{#if hasOverlay.includes(id)}
				<img
					src={`assets/img/panels/${panelBg}2.png`}
					class="full-panel overlay"
					class:visible={$currentPanel === i}
				/>
			{/if}

			{#if id === "survey-basic"}
				<img
					src={`assets/img/panels/ground.png`}
					class="full-panel extra-ground"
				/>
			{/if}

			<div class="content">
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
				{:else if id === "gallery"}
					<Gallery images={copy.gallery} />
				{:else if id === "resources"}
					<Resources {text} />
				{:else if text && text.length}
					<Text {i} {text} {id} />
				{/if}

				{#if id === "try-wheel"}
					<RollingWheel img={"grey_wheel_blank.png"} {i} />
				{:else if id === "granularity"}
					<RollingWheel img={"grey_wheel.png"} {i} animation={false} />
				{:else if id === "color"}
					<RollingWheel img={"simple_wheel_color.png"} {i} />
				{:else if id === "body"}
					<BodyDemo {i} />
				{:else if id === "final-wheel"}
					<RollingWheel img={"final_wheel.png"} {i} />
				{:else if id === "let-go"}
					<Summary />
				{/if}
			</div>
		</div>
	{/each}

	{#if showFooter}
		<div
			class="step"
			id="footer"
			class:visible={$entered}
			style:width={`${$stepWidth}px`}
		>
			<img src={`assets/img/panels/ground.png`} class="full-panel" />
			<Footer />
		</div>
	{/if}
</Scrolly>

<style>
	.step {
		position: relative;
		margin: 0;
		transition: opacity 1s;
		opacity: 0;
	}
	.step.visible {
		opacity: 1;
	}
	.step:first-of-type {
		min-width: 100vw;
	}
	.extra-ground {
		position: absolute;
		right: 0;
		top: 0;
	}
	.content {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
	}
	img.full-panel {
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
</style>
