<script>
	import { update } from "$utils/supabase.js";
	import { words, colors, userId } from "$stores/misc.js";
	import ColorSelect from "svelte-color-select";

	let r = 102;
	let g = 51;
	let b = 153;

	$: selectedColor = `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`;

	let i = 0;
	$: currentWord = $words[i];

	$: console.log($words);
	$: console.log($colors);

	const confirm = async (e) => {
		$colors[i] = selectedColor;

		const value = $colors.join("|");
		await update({
			table: "emotions",
			column: "colors",
			value,
			id: $userId
		});

		if (i + 1 < $words.length) i += 1;
		else i = 0;
	};
</script>

<p>
	You're feeling <strong>{currentWord}</strong> - what color is it?
</p>
<ColorSelect bind:r bind:g bind:b />

<div style={`display: flex`}>
	<div class="swatch" style:background={selectedColor} />
	<button on:click={confirm}>Next</button>
</div>

<style>
	.swatch {
		height: 50px;
		width: 50px;
	}
	button {
		display: block;
		z-index: 1;
	}
</style>
