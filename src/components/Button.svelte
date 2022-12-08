<script>
	import { annotate } from "svelte-rough-notation";
	import mq from "$stores/mq.js";

	export let onClick;
	export let color;
	export let btnStyles;

	let hovered = false;
</script>

<button
	style={`--background: ${color}`}
	on:click={onClick}
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
	use:annotate={{
		type: "box",
		animate: !$mq.reducedMotion,
		visible: hovered,
		color: "black",
		padding: 0
	}}
>
	<slot />
</button>

<style>
	button {
		transition: all calc(var(--1s) * 0.5);
		margin-right: 8px;
		background: var(--background);
	}
	button:hover {
		background: var(--color-gray-400);
	}
</style>
