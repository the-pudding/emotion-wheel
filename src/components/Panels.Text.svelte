<script>
	import { currentPanel, zoomModalImage } from "$stores/misc.js";
	import mq from "$stores/mq.js";

	export let i;
	export let text;
	export let id;
	export let long = false;
	export let cloud = false;
	export let overlay = false;

	$: center = id === "fascinating" || id === "entry" || id === "overview";

	const onClick = () => {
		$zoomModalImage = `panels/${id}${overlay ? "2" : ""}`;
	};
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

{#if cloud}
	<div class="image" {id} on:click={onClick}>
		<img src={`assets/img/panels/${id}.png`} class="cloud" />

		{#if overlay}
			<img
				src={`assets/img/panels/${id}2.png`}
				class="cloud overlay"
				class:visible={$currentPanel === i}
			/>
		{/if}
	</div>
{/if}

<style>
	.text {
		width: 40%;
		margin-left: 5%;
		margin-right: 5%;
		transform: translate(50px, -20%);
		opacity: 0;
		transition: all calc(var(--1s) * 1.5);
	}
	.text.visible {
		opacity: 1;
		transform: translate(0px, -20%);
	}
	.center {
		transform: translate(calc(50% + 50px), -20%);
	}
	.center.visible {
		transform: translate(50%, -20%);
	}

	.image {
		position: relative;
		width: 60%;
		max-width: 700px;
		margin-right: 5%;
		transition: transform calc(var(--1s) * 0.5);
	}
	.image:hover {
		cursor: pointer;
		transform: scale(1.03);
	}
	.cloud {
		width: 100%;
	}

	.overlay {
		position: absolute;
		top: 0;
		opacity: 0;
		transition: opacity calc(var(--1s) * 2.5) var(--1s);
	}
	.overlay.visible {
		opacity: 1;
	}

	@media (max-height: 600px) {
		.text {
			transform: translate(50px, 0);
		}
		.text.visible {
			transform: translate(0, 0);
		}
		.center {
			transform: translate(calc(50% + 50px), 0%);
		}
		.center.visible {
			transform: translate(50%, 0%);
		}
	}

	@media (max-height: 400px) {
		.text {
			width: 60%;
		}
		.image {
			width: 40%;
		}
	}
</style>
