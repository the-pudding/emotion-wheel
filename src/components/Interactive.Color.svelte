<script>
	import { update } from "$utils/supabase.js";
	import { words, colors, userId, worldBg } from "$stores/misc.js";
	import ColorPicker from "$components/ColorPicker.svelte";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";

	const sound = new Howl({ src: ["assets/sound/after-color.wav"] });
	const initialColor = "rgb(216, 216, 216)";
	let color = initialColor;
	let i = 0;

	// TODO: let them go one time through, then be done, there can be an option to go back
	// when you're in it, the world changes whenever the colors change
	// when you're not, we go back to grey

	$: currentWord = $words[i];
	$: color, onColorChange();

	const onColorChange = () => {
		if (color !== initialColor && !$colors[i]) $worldBg = color;
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
	<button on:click={confirm}>That's it</button>
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
</style>
