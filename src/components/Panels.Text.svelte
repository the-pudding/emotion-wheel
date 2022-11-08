<script>
	import { currentPanel } from "$stores/misc.js";

	export let i;
	export let text;
</script>

<div class="words" class:visible={i === $currentPanel}>
	{#each text as t}
		<p>{@html t}</p>
	{/each}
</div>

<style>
	.words {
		position: absolute;
		top: 24%;
		left: 5%;
		max-width: 500px;
		opacity: 0;
		transform: translateX(100px);
		transition: transform 1s 300ms, opacity 1s 300ms;
	}
	.visible {
		opacity: 1;
		transform: translateX(0);
	}
</style>
