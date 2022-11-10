<script>
	import { basicFeeling, words, colors, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";

	export let text;

	const options = ["ok", "good", "not great", "busy"];

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	const sound = new Howl({
		src: ["assets/sound/after-basic.wav"]
	});

	const submit = async (e) => {
		sound.play();
		const response = e.target.id;
		$basicFeeling = response;
		$words = [];
		$colors = [];
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
			<button on:click={submit} id={d} class="option" class:selected>{d}</button
			>
		{/each}
	</div>
	<button class="skip" on:click={skip}>skip</button>
</div>

<style>
	.words {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
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
</style>
