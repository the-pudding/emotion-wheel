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
	const formatWord = (str) => _.startCase(str).toLowerCase();

	$: currentWord = $words[i];
	$: color, onColorChange();
	$: textColor = determineFontColor($worldBg);
	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);
	$: disabled = $colors.length > 0;

	const onColorChange = () => {
		if (color !== initialColor) $worldBg = color;
	};

	const initialize = () => {
		if ($colors[i]) {
			color = $colors[i];
			$worldBg = variables.color["sky-blue"];
		} else {
			color = initialColor;
			$worldBg = initialColor;
		}
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
		editing = false;
		initialize();
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="colors">
	{#if editing}
		<p class="text" style:color={textColor}>
			You're feeling <strong class="word">{formatWord(currentWord)}</strong> - what
			color is it?
		</p>
		<ColorPicker bind:color />

		<div class="buttons">
			<button class="skip" on:click={skip} {disabled}>skip</button>
			<button class="confirm" on:click={confirm}>That's it</button>
		</div>
	{:else}
		<p>Nice work!</p>
		<button on:click={edit}>Edit my colors</button>
	{/if}
</div>

<style>
	.colors {
		position: absolute;
		top: 40%;
		left: 15%;
		transform: translate(0, -50%);
		width: 30%;
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
		text-align: center;
	}
	:global(hex-color-picker) {
		height: 200px;
		width: 200px;
	}

	@media (max-height: 600px) {
		.buttons {
			width: 100%;
			justify-content: space-between;
		}
		button.skip {
			position: static;
		}
		:global(hex-color-picker) {
			height: 150px;
			width: 150px;
		}
	}
</style>
