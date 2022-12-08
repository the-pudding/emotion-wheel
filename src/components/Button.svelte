<script>
	import { annotate } from "svelte-rough-notation";
	import mq from "$stores/mq.js";

	export let buttonEl;
	export let onClick;
	export let color = "white";
	export let height;
	export let width;
	export let top;
	export let left;
	export let right;
	export let bottom;
	export let marginLeft;
	export let disabled = false;
	export let transform = false;
	export let small = false;
	export let big = false;
	export let animate = true;

	let hovered = false;
</script>

<button
	bind:this={buttonEl}
	class:position={top || left || right || bottom}
	class:transform
	class:small
	class:big
	style={`--background: ${color}; --top: ${top}; --left: ${left}; --right: ${right}; --bottom: ${bottom}; --marginLeft: ${marginLeft}; --height: ${height}; --width: ${width}`}
	on:click={onClick}
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
	use:annotate={{
		type: "box",
		animate: animate && !$mq.reducedMotion,
		visible: hovered || !animate,
		color: "black",
		padding: 0
	}}
	{disabled}
>
	<slot />
</button>

<style>
	button {
		transition: all calc(var(--1s) * 0.5);
		margin-left: var(--marginLeft);
		background: var(--background);
		border: 1px solid black;
		width: var(--width);
		height: var(--height);
	}
	button:hover {
		background: var(--color-gray-300);
	}
	button.position {
		position: absolute;
		top: var(--top);
		left: var(--left);
		bottom: var(--bottom);
		right: var(--right);
	}
	.transform {
		transform: translate(-50%, -50%);
	}
	.small {
		font-size: var(--16px);
	}
	.big {
		font-size: 1.6em;
	}
</style>
