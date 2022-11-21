<script>
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import { basicFeeling, words } from "$stores/misc.js";
	import _ from "lodash";
	import { onMount } from "svelte";
	import okaySlices from "$svg/okay-slices.svg";
	import goodSlices from "$svg/good-slices.svg";
	import notGreatSlices from "$svg/not-great-slices.svg";
	import busySlices from "$svg/busy-slices.svg";
	import { annotate } from "rough-notation";
	import variables from "$data/variables.json";

	export let text;

	const slices = {
		okay: okaySlices,
		good: goodSlices,
		"not great": notGreatSlices,
		busy: busySlices
	};

	$: disabled = $words.length > 0;
	$: $basicFeeling, updateBasicFeeling();

	const skip = () => {
		$words = [$basicFeeling];
	};

	const updateBasicFeeling = () => {
		const span = document.querySelector("span#basic-word");
		console.log({ span });

		if (span) {
			const annotation = annotate(span, {
				type: "highlight",
				animate: false,
				color: variables.color["grey-balloon"]
			});
			annotation.show();
			span.innerHTML = $basicFeeling;
		}
	};

	onMount(() => {
		updateBasicFeeling();
	});
</script>

<div class="words">
	{#each text as t}
		<div>{@html t}</div>
	{/each}

	{#key $basicFeeling}
		<ClickableWheel
			slices={slices[$basicFeeling]}
			imgSrc={`assets/img/simple-interactive-wheels/${_.kebabCase(
				$basicFeeling
			)}.png`}
			wheelId={`${_.kebabCase($basicFeeling)}-grey`}
			bind:selected={$words}
			limit={3}
			soundId={"pop"}
		/>
	{/key}

	<div class="buttons">
		<button class="skip" on:click={skip} {disabled}>skip</button>
	</div>
</div>

<style>
	.words {
		position: absolute;
		left: 15%;
		top: 40%;
		transform: translate(0, -50%);
		width: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.words div:nth-child(2) {
		font-size: 16px;
		margin: 0.5em 0;
	}
	.words div {
		text-align: center;
	}
	.buttons {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button.skip {
		position: absolute;
		left: 0;
	}

	:global(svg#grey-wheel) {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	:global(#grey-wheel #slices path) {
		opacity: 0;
	}
	:global(#grey-wheel #slices path):hover {
		cursor: pointer;
	}
	:global(#grey-wheel #slices path.highlighted) {
		opacity: 0.4;
	}
</style>
