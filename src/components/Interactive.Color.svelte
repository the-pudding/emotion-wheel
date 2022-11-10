<script>
	import { words, colors, worldBg, soundOn } from "$stores/misc.js";
	import ColorPicker from "$components/ColorPicker.svelte";
	import { Howl } from "howler";
	import { onDestroy, onMount } from "svelte";
	import determineFontColor from "$utils/determineFontColor.js";
	import _ from "lodash";
	import variables from "$data/variables.json";

	const sound = new Howl({ src: ["assets/sound/after-color.wav"] });
	const initialColor = variables.color["grey-balloon"];
	let color = initialColor;
	let i = 0;
	let editing = true;

	$: currentWord = $words[i];
	$: color, onColorChange();
	$: textColor = determineFontColor($worldBg);
	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	const onColorChange = () => {
		if (color !== initialColor) $worldBg = color;
	};

	const initialize = () => {
		if ($colors[i]) {
			color = $colors[i];
		} else {
			color = initialColor;
		}
		$worldBg = initialColor;
	};

	const confirm = async () => {
		sound.play();
		$colors[i] = color;

		if (i + 1 < $words.length) i += 1;
		else {
			editing = false;
		}

		initialize();
	};

	const edit = () => {
		editing = true;
		i = 0;
		color = $colors[i];
		$worldBg = color;
	};

	const skip = () => {
		$colors = [initialColor];
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="words">
	{#if editing}
		<p class="text" style:color={textColor}>
			You're feeling <strong class="word">{currentWord}</strong> - what color is
			it?
		</p>
		<ColorPicker bind:color />

		<div class="buttons">
			<button class="skip" on:click={skip}>skip</button>
			<button class="confirm" on:click={confirm}>That's it</button>
		</div>
	{:else}
		<p>Nice work!</p>
		<button on:click={edit}>Edit my colors</button>
	{/if}
</div>

<style>
	.words {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.buttons {
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
		margin-top: 1em;
	}
	button.skip {
		position: absolute;
		left: 0;
	}
	.word {
		font-size: 1.6em;
		margin: 0 3px;
	}
	.text {
		transition: color 500ms;
	}
</style>
