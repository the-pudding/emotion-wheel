<script>
	import ColorSelect from "svelte-color-select";

	export let color;

	$: r = stringToRgb(color)[0];
	$: g = stringToRgb(color)[1];
	$: b = stringToRgb(color)[2];

	const stringToRgb = (str) => {
		const nums = str.replace("rgb(", "").replace(")", "");
		return nums.split(",").map((d) => d.trim());
	};

	$: r, g, b, onChange();
	const onChange = () => {
		if (r && g && b) {
			color = `rgb(${r}, ${g}, ${b})`;
		}
	};
</script>

<ColorSelect bind:r bind:g bind:b />
