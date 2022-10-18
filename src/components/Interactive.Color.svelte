<script>
	import { update } from "$utils/supabase.js";
	import { words, colors, userId } from "$stores/misc.js";
	import ColorSelect from "svelte-color-select";

	let i = 0;
	$: currentWord = $words[i];

	let selectedColor;
	let r = 216; // lightgrey
	let g = 216;
	let b = 216;

	const stringToRgb = (str) => {
		const nums = str.replace("rgb(", "").replace(")", "");
		return nums.split(",").map((d) => d.trim());
	};

	const initialize = () => {
		if ($colors[i]) {
			const rgb = stringToRgb($colors[i]);
			r = rgb[0];
			g = rgb[1];
			b = rgb[2];
		}
	};

	const onChange = (e) => {
		const rgb = e.detail.rgb;
		if (rgb[0] && rgb[1] && rgb[2]) {
			selectedColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
			$colors[i] = selectedColor;
		}
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

		initialize();
	};
</script>

<p>
	You're feeling <strong>{currentWord}</strong> - what color is it?
</p>
<ColorSelect {r} {g} {b} on:change={onChange} />

<div style={`display: flex`}>
	<button on:click={next}>Next</button>
</div>

<style>
	button {
		display: block;
		z-index: 1;
	}
</style>
