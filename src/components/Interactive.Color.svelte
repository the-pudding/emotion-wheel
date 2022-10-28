<script>
	import { update } from "$utils/supabase.js";
	import { words, colors, userId } from "$stores/misc.js";
	import ColorPicker from "$components/ColorPicker.svelte";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";

	const sound = new Howl({ src: ["assets/sound/after-color.wav"] });
	let color = "rgb(216, 216, 216)";
	let i = 0;

	$: currentWord = $words[i];
	$: color, onColorChange();

	const onColorChange = () => {
		sound.play();
		$colors[i] = color;
	};

	const initialize = () => {
		if ($colors[i]) {
			color = $colors[i];
		} else {
			color = "rgb(216, 216, 216)";
		}
	};

	// TODO: this db stuff should either happen after every change or when all words have a color? oncolorchange
	const next = async () => {
		const value = $colors.join("|");
		await update({
			table: "emotions",
			column: "colors",
			value,
			id: $userId
		});

		if (i + 1 < $words.length) i += 1;
		else i = 0;

		initialize();
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<p>
	You're feeling <strong class="word">{currentWord}</strong> - what color is it?
</p>
<ColorPicker bind:color />

{#if $words.length > 1}
	<button on:click={next}>Next</button>
{/if}

<style>
	button {
		display: block;
		z-index: 1;
	}
	.word {
		font-size: 1.6em;
		margin: 0 3px;
	}
</style>
