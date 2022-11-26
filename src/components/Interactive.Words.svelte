<script>
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import Callout from "$components/Callout.svelte";
	import { basicFeeling, words } from "$stores/misc.js";
	import _ from "lodash";
	import okaySlices from "$svg/okay-slices.svg";
	import goodSlices from "$svg/good-slices.svg";
	import notGreatSlices from "$svg/not-great-slices.svg";
	import busySlices from "$svg/busy-slices.svg";
	import { annotate } from "svelte-rough-notation";
	import variables from "$data/variables.json";

	export let text;

	const slices = {
		okay: okaySlices,
		good: goodSlices,
		"not great": notGreatSlices,
		busy: busySlices
	};

	$: disabled = $words.length > 0;

	const skip = () => {
		$words = [$basicFeeling];
	};
</script>

<div class="words">
	<div>
		Here you try... what do you mean by<br /><span
			use:annotate={{
				type: "highlight",
				animate: false,
				visible: true,
				color: variables.color["grey-balloon"]
			}}>{$basicFeeling}?</span
		>
	</div>
	{#each text as t, i}
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
</div>

<button class="skip" on:click={skip} {disabled}>skip</button>

{#if $words.length}
	<Callout />
{/if}

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
	button.skip {
		position: absolute;
		top: 53%;
		left: 67.5%;
		transform: translate(-50%, -50%);
	}
	span {
		font-size: 1.6em;
		font-weight: bold;
	}
</style>
