<script>
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import { basicFeeling, words, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";
	import slices from "$svg/grey-wheel-slices.svg";

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

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="words">
	{#if editing}
		<p>Here, you try...</p>
		<p>What do you mean by <strong>{$basicFeeling}</strong>?</p>
		<p>You can choose up to 3.</p>

		<ClickableWheel
			{slices}
			imgSrc={`assets/img/grey_wheel.png`}
			wheelId="grey-wheel"
			bind:selected={$words}
			limit={3}
		/>
		<button on:click={confirm}>Confirm</button>
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
		align-items: center;
	}

	button.continue {
		display: block;
	}
	.emotions {
		z-index: 1;
	}
	.emotions p {
		margin: 0;
	}
	.emotions p:hover {
		cursor: pointer;
		font-size: 1.6em;
		text-decoration: underline;
	}
	.emotions p.selected {
		font-size: 1.6em;
		text-decoration: underline;
	}

	.wheel {
		position: relative;
		max-width: 800px;
		margin: 0 auto;
	}
	img {
		width: 100%;
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
