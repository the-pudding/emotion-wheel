<script>
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import { basicFeeling, words, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy, onMount } from "svelte";
	import okSlices from "$svg/ok-slices.svg";
	import goodSlices from "$svg/good-slices.svg";
	import notGreatSlices from "$svg/not-great-slices.svg";
	import busySlices from "$svg/busy-slices.svg";

	export let text;

	const slices = {
		ok: okSlices,
		good: goodSlices,
		"not great": notGreatSlices,
		busy: busySlices
	};

	const sound = new Howl({ src: ["assets/sound/after-word.wav"] });

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);
	$: disabled = $words.length > 0;
	$: $basicFeeling, updateBasicFeeling();

	const skip = () => {
		$words = [$basicFeeling];
	};

	const updateBasicFeeling = () => {
		const span = document.querySelector("span#basic-word");
		if (span) span.innerHTML = $basicFeeling;
	};

	onMount(() => {
		updateBasicFeeling();
	});

	onDestroy(() => {
		sound.unload();
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
		/>
	{/key}

	<div class="buttons">
		<button class="skip" on:click={skip} {disabled}>skip</button>
	</div>
</div>

<style>
	.words {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		width: 100px;
		display: flex;
		flex-direction: column;
	}
	.words div:nth-child(2) {
		font-size: 16px;
		margin: 0.5em 0;
	}
	:global(span#basic-word) {
		font-weight: bold;
		text-decoration: underline;
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

	@media (hover: hover) and (pointer: fine) {
		.words {
			width: 20%;
		}
	}
</style>
