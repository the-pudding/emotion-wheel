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
	import mq from "$stores/mq.js";

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
		if (scrollyEl) scrollyEl.refreshNodes(visibleSteps);
	};

	const noImg = [
		"entry",
		"try-wheel",
		"fascinating",
		"color",
		"final-wheel",
		"let-go",
		"gallery",
		"resources",
		"thank-you"
	];
	const sign = ["gallery-intro", "closing"];
	const hasOverlay = ["core", "body-color", "same-way", "body"];
</script>

<Scrolly bind:value={$currentPanel} bind:this={scrollyEl}>
	{#each visibleSteps as { id, text, alt }, i}
		{@const panelBg = id.includes("survey")
			? `${id}-${surveyNeeded === id ? "pre" : "post"}`
			: sign.includes(id)
			? id
			: "ground"}
		{@const wordSurveyMobile = id === "survey-words" && $mq.sm}
		{@const cloud = !noImg.includes(id) && !sign.includes(id)}
		{@const overlay = hasOverlay.includes(id)}

		<div
			class="step"
			class:visible={$entered}
			{id}
			style:width={`${$stepWidth}px`}
		>
			<img
				srcset={`assets/img/panels/${
					wordSurveyMobile ? "ground" : panelBg
				}-sm.png 800w, assets/img/panels/${
					wordSurveyMobile ? "ground" : panelBg
				}-lg.png 1920w`}
				sizes={`(max-width: 600px) 800px, 1920px`}
				src={`assets/img/panels/${
					wordSurveyMobile ? "ground" : panelBg
				}-lg.png`}
				class="full-panel"
				alt="the ground"
			/>

			<div class="content" class:float-right={id === "entry"}>
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
					<Text i={i >= 9 ? i + 1 : i} {text} {alt} {id} {cloud} {overlay} />
				{/if}

				{#if id === "try-wheel"}
					<RollingWheel img={"grey_wheel_blank.png"} {i} />
				{:else if id === "color"}
					<RollingWheel img={"simple_wheel_color.png"} {i} />
				{:else if id === "final-wheel"}
					<RollingWheel img={"final_wheel.png"} {i} />
				{:else if id === "let-go"}
					<Summary />
				{/if}
			</div>
		</div>

		{#if id === "survey-words" && $mq.sm}
			<div
				class="step"
				class:visible={$entered}
				{id}
				style:width={`${$stepWidth}px`}
			>
				<img
					srcset={`assets/img/panels/${panelBg}-sm.png 800w, assets/img/panels/${panelBg}-lg.png 1920w`}
					sizes={`(max-width: 600px) 800px, 1920px`}
					src={`assets/img/panels/${panelBg}-lg.png`}
					class="full-panel"
					alt="the ground"
					style={`position: absolute; bottom: 0`}
				/>
				<Words justWheel={true} />
			</div>
		{/if}
	{/each}

	{#if showFooter}
		<div
			class="step"
			id="footer"
			class:visible={$entered}
			style:width={`${$stepWidth}px`}
		>
			<img
				srcset={`assets/img/panels/ground-sm.png 800w, assets/img/panels/ground-lg.png 1920w`}
				sizes={`(max-width: 600px) 800px, 1920px`}
				src={`assets/img/panels/ground-lg.png`}
				class="full-panel"
				alt="the ground"
			/>
			<Footer />
		</div>
	{/if}
</Scrolly>

<style>
	.step {
		position: relative;
		margin: 0;
		transition: opacity var(--1s);
		opacity: 0;
	}
	.step.visible {
		opacity: 1;
	}
	.content {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		display: flex;
		align-items: center;
	}
	.content.float-right {
		justify-content: flex-end;
	}
	img.full-panel {
		height: 100%;
		max-width: none;
	}
	.genius {
		position: absolute;
		transform: translate(-50%, -50%);
		left: 87%;
		top: 70%;
		background: rgb(247, 203, 122);
		padding: 0.5em;
		font-size: var(--14px);
		text-align: center;
	}

	@media (max-height: 450px) {
		.genius {
			font-size: var(--12px);
			width: 150px;
		}
	}
</style>
