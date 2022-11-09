<script>
	import { basicFeeling, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";

	const options = ["ok", "good", "busy"];

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	const sound = new Howl({
		src: ["assets/sound/after-basic.wav"]
	});

	const submit = async (e) => {
		sound.play();
		const response = e.target.id;
		$basicFeeling = response;
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="words">
	<p>Hi, how are you doing?</p>
	{#each options as d}
		{@const selected = d === $basicFeeling}
		<button on:click={submit} id={d} class:selected>{d}</button>
	{/each}
</div>

<style>
	/* .container {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100%;
	} */
	.words {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
	}
	button {
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
