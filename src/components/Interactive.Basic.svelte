<script>
	import { basicFeeling, words, colors, needs, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";

	export let text;

	const options = ["okay", "good", "not great", "busy"];

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);
	$: disabled = $basicFeeling;

	const sound = new Howl({
		src: ["assets/sound/magic.wav"]
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
		$basicFeeling = "okay";
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="basic">
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
	.basic {
		position: absolute;
		top: 40%;
		left: 30%;
		transform: translate(0, -50%);
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

	@media (max-height: 600px) {
		.basic {
			max-width: 400px;
		}
	}
</style>
