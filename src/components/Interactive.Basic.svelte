<script>
	import { basicFeeling, words, colors, needs, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";

	export let text;

	const options = ["ok", "good", "not great", "busy"];

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);
	$: disabled = $basicFeeling;

	const sound = new Howl({
		src: ["assets/sound/after-basic.wav"]
	});

	const select = async (e) => {
		sound.play();
		const response = e.target.id;
		$basicFeeling = response;
		$words = [];
		$colors = [];
		$needs = [];
	};

	const skip = () => {
		$basicFeeling = "ok";
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="words">
	{#each text as t}
		<p>{@html t}</p>
	{/each}
	<div class="options">
		{#each options as d}
			{@const selected = d === $basicFeeling}
			<button on:click={select} id={d} class="option" class:selected>{d}</button
			>
		{/each}
	</div>
	<button class="skip" on:click={skip} {disabled}>skip</button>
</div>

<style>
	.words {
		position: absolute;
		left: 12em;
		top: 3em;
	}
	.options {
		margin-bottom: 1em;
	}
	button.option {
		background: none;
		font-size: 1.6em;
		padding: 0;
		margin: 0 20px;
	}
	button:first-of-type {
		margin-left: 0;
	}
	button:hover,
	button.selected {
		text-decoration: underline;
	}

	@media (hover: hover) and (pointer: fine) {
		.words {
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			max-width: none;
		}
	}
</style>
