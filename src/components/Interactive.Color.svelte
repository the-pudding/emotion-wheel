<script>
	import { words, colors, worldBg, soundOn } from "$stores/misc.js";
	import ColorPicker from "$components/ColorPicker.svelte";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";
	import determineFontColor from "$utils/determineFontColor.js";
	import _ from "lodash";
	import variables from "$data/variables.json";

	const selectSound = new Howl({
		src: ["assets/sound/select.wav"],
		volume: 0.3
	});
	const doneSound = new Howl({
		src: ["assets/sound/after-color.wav"],
		volume: 0.3
	});

	const initialColor = variables.color["grey-balloon"];
	let color = initialColor;
	let i = 0;
	let editing = true;
	const formatWord = (str) =>
		str === "somethings-wrong"
			? "something's wrong"
			: _.startCase(str).toLowerCase();

	$: currentWord = $words[i];
	$: color, onColorChange();
	$: textColor = determineFontColor($worldBg);
	$: if (!$soundOn) {
		selectSound.mute(true);
		doneSound.mute(true);
	}
	$: if ($soundOn) {
		selectSound.mute(false);
		doneSound.mute(false);
	}
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
		$colors[i] = color;

		if (i + 1 < $words.length) {
			selectSound.play();
			i += 1;
		} else {
			doneSound.play();
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
		selectSound.play();
		$colors = [initialColor];
		editing = false;
		initialize();
	};

	onDestroy(() => {
		selectSound.unload();
		doneSound.unload();
	});
</script>

<div class="colors">
	{#if editing}
		<p class="text" style:color={textColor}>
			You're feeling <span class="word">{formatWord(currentWord)}</span> - what color
			is it?
		</p>
		<ColorPicker bind:color />

		<div class="buttons">
			<button class="confirm" on:click={confirm}>That's it</button>
		</div>
	{:else}
		<p>Nice work!</p>
		<button class="confirm" on:click={edit}>Edit my colors</button>
	{/if}
</div>
<button class="skip" on:click={skip} {disabled}>skip</button>

<style>
	.colors {
		margin-left: 20%;
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
		top: 53%;
		left: 67.5%;
		transform: translate(-50%, -50%);
	}
	.word {
		font-size: 1.6em;
		margin: 0 3px;
		font-weight: bold;
	}
	.text {
		transition: color calc(var(--1s) * 0.5);
		text-align: center;
	}
	:global(hex-color-picker) {
		height: 200px;
		width: 200px;
	}

	@media (max-height: 600px) {
		:global(hex-color-picker) {
			height: 150px;
			width: 150px;
		}
	}
	@media (max-height: 400px) {
		:global(hex-color-picker) {
			height: 110px;
			width: 110px;
		}
	}
</style>
