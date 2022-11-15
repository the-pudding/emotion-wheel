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
		top: 20%;
		left: 1em;
		max-width: 230px;
		opacity: 0;
		transition: transform 1s, opacity 1s;
	}
	.visible {
		opacity: 1;
		transform: translateX(0);
	}

	@media (hover: hover) and (pointer: fine) {
		.words {
			top: 24%;
			left: 5%;
			max-width: 500px;
			transform: translateX(100px);
		}
	}
</style>
