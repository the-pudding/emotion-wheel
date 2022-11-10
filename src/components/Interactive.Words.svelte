<script>
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import { basicFeeling, words, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy, onMount } from "svelte";
	import slices from "$svg/grey-wheel-slices.svg";

	export let text;

	let editing = true;
	const sound = new Howl({ src: ["assets/sound/after-word.wav"] });

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	const confirm = () => {
		editing = false;
	};

	const edit = () => {
		editing = true;
	};

	const skip = () => {
		$words = ["ok"];
	};

	onMount(() => {
		document.querySelector("span#basic-word").innerHTML = $basicFeeling;
	});

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="words">
	{#if editing}
		{#each text as t}
			<div>{@html t}</div>
		{/each}

		<ClickableWheel
			{slices}
			imgSrc={`assets/img/grey_wheel.png`}
			wheelId="grey-wheel"
			bind:selected={$words}
			limit={3}
		/>

		<div class="buttons">
			<button class="skip" on:click={skip}>skip</button>
			<button class="confirm" on:click={confirm}>Confirm</button>
		</div>
	{:else}
		<p>Nice work!</p>
		<button on:click={edit}>Edit my words</button>
	{/if}
</div>

<style>
	.words {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		width: 20%;
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
</style>
