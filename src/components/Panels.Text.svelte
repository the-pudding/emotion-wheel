<script>
	import { currentPanel } from "$stores/misc.js";
	import mq from "$stores/mq.js";

	export let i;
	export let text;
	export let id;
	export let long = false;
</script>

<div
	class="text"
	class:center={id === "fascinating" || id === "entry"}
	class:big={id === "fascinating"}
	class:visible={i === $currentPanel || $mq.reducedMotion}
	class:long
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
		top: 30%;
		transform: translateX(100px);
		opacity: 0;
		transition: transform var(--1s), opacity var(--1s);
	}
	.text.long {
		max-width: 600px;
	}
	.visible {
		opacity: 1;
		transform: translateX(0);
	}
	.center {
		top: 40%;
		left: 40%;
		transform: translate(-50%, -50%);
	}
	.big {
		font-size: var(--48px);
	}

	@media (max-height: 800px) {
		.text {
			max-width: 350px;
		}
		.text.long,
		.text.big {
			max-width: 500px;
		}
	}
	@media (max-height: 600px) {
		.text {
			top: 10%;
			max-width: 200px;
		}
		.text.long {
			max-width: 300px;
			transform: translate(0, 0);
		}
		.big {
			font-size: var(--32px);
			max-width: none;
			transform: translate(0, 0);
		}
	}
</style>
