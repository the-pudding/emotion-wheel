<script>
	import { update } from "$utils/supabase.js";
	import { words, colors, userId, worldBg } from "$stores/misc.js";
	import ColorPicker from "$components/ColorPicker.svelte";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";
	import variables from "$data/variables.json";
	import determineFontColor from "$utils/determineFontColor.js";

	const sound = new Howl({ src: ["assets/sound/after-color.wav"] });
	const initialColor = variables.color["grey-balloon"];
	let color = initialColor;
	let i = 0;
	let editing = true;

	$: currentWord = $words[i];
	$: color, onColorChange();
	$: textColor = determineFontColor($worldBg);

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

	const updateDb = async () => {
		const value = $colors.join("|");
		await update({
			table: "emotions",
			column: "colors",
			value,
			id: $userId
		});
	};

	const confirm = async () => {
		sound.play();
		$colors[i] = color;

		await updateDb();

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

	onDestroy(() => {
		sound.unload();
	});
</script>

{#if editing}
	<p class="text" style:color={textColor}>
		You're feeling <strong class="word">{currentWord}</strong> - what color is it?
	</p>
	<ColorPicker bind:color />

	<button on:click={confirm}>That's it</button>
{:else}
	<p>Nice work!</p>
	<button on:click={edit}>Edit my colors</button>
{/if}

<style>
	button {
		display: block;
		z-index: 1;
		margin-top: 1em;
	}
	.word {
		font-size: 1.6em;
		margin: 0 3px;
	}
	.text {
		transition: color 500ms;
	}
</style>
