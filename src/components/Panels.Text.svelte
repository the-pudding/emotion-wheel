<script>
	import { currentPanel } from "$stores/misc.js";

	export let i;
	export let text;
	export let id;
</script>

<div
	class="text"
	class:fascinating={id === "fascinating"}
	class:visible={i === $currentPanel}
>
	{#each text as t}
		<p>{@html t}</p>
	{/each}
</div>

<style>
	.text {
		position: absolute;
		max-width: 450px;
		left: 5%;
		top: 40%;
		transform: translate(0, -50%);
		opacity: 0;
		transition: transform 1s, opacity 1s;
	}
	.visible {
		opacity: 1;
	}
	.fascinating {
		top: 40%;
		left: 40%;
		transform: translate(-50%, -50%);
		font-size: var(--48px);
	}

	@media (max-height: 600px) {
		.text {
			max-width: 250px;
		}
		.fascinating {
			font-size: var(--32px);
		}
	}
</style>
