<script>
	import { currentPanel } from "$stores/misc.js";
	import mq from "$stores/mq.js";

	export let i;
	export let text;
	export let id;
	export let long = false;

	$: center =
		id === "fascinating" ||
		id === "entry" ||
		id === "closing" ||
		id === "gallery-intro";
</script>

<div
	class="text"
	class:center
	class:big={id === "fascinating"}
	class:visible={i === $currentPanel || $mq.reducedMotion}
	class:long
	class:first={id === "entry"}
>
	{#each text as t}
		<p>{@html t}</p>
	{/each}
</div>

<style>
	.text {
		position: absolute;
		max-width: 450px;
		top: 40%;
		left: 20%;
		transform: translate(calc(-50% + 100px), -50%);
		opacity: 0;
		transition: transform var(--1s), opacity var(--1s);
	}
	.text.long {
		max-width: 600px;
	}
	.center {
		top: 40%;
		left: 40%;
		transform: translate(calc(-50% + 100px), -50%);
	}
	.visible {
		opacity: 1;
		transform: translate(-50%, -50%);
	}
	.big {
		font-size: var(--48px);
		max-width: none;
	}
	.first {
		left: 60%;
	}

	@media (max-height: 800px) {
		.text {
			max-width: 350px;
		}
		.text.long {
			max-width: 500px;
		}
		.big {
			max-width: none;
		}
	}
	@media (max-height: 600px) {
		.text {
			max-width: 250px;
		}
		.text.long {
			max-width: 300px;
		}
		.big {
			font-size: var(--32px);
			max-width: none;
		}
	}
	@media (max-height: 400px) {
		.text {
			max-width: 200px;
		}
		.big {
			max-width: none;
		}
	}
</style>
