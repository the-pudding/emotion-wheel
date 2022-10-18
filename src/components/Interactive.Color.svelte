<script>
	import { update } from "$utils/supabase.js";
	import { words, colors, userId } from "$stores/misc.js";
	import ColorSelect from "svelte-color-select";

	let i = 0;
	$: currentWord = $words[i];

	let selectedColor;
	let r = 0;
	let g = 0;
	let b = 0;

	const onChange = (e) => {
		const rgb = e.detail.rgb;
		selectedColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
		$colors[i] = selectedColor;
	};

	const next = async (e) => {
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
<ColorSelect {r} {g} {b} on:change={onChange} />

<div style={`display: flex`}>
	<div class="swatch" style:background={selectedColor} />
	<button on:click={next}>Next</button>
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
