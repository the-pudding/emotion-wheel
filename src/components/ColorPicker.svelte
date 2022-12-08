<script>
	import { onMount } from "svelte";

	export let color;

	const colorChange = (event) => {
		color = event.detail.value;
	};

	let Thing;
	onMount(async () => {
		Thing = (await import("vanilla-colorful")).default;
	});
</script>

<div>
	<hex-color-picker {color} on:color-changed={colorChange} />
</div>

<style>
	hex-color-picker:hover {
		cursor: pointer !important;
	}
	div {
		margin-bottom: 1em;
	}
</style>
