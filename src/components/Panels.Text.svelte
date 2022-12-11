<script>
	import { currentPanel, zoomModalImage, modalAlt } from "$stores/misc.js";
	import mq from "$stores/mq.js";

	export let i;
	export let text;
	export let alt;
	export let id;
	export let cloud = false;
	export let overlay = false;

	$: center = id === "fascinating";

	const processText = (str) => {
		if ($mq.desktop) return str;
		else return str.replace("click", "tap").replace("Click", "Tap");
	};

	const onClick = () => {
		$zoomModalImage = `panels/${id}${overlay ? "2" : ""}`;
		$modalAlt = alt;
	};
</script>

<div
	class="text"
	class:center
	class:big={id === "fascinating"}
	class:visible={i === $currentPanel || $mq.reducedMotion}
	class:first={id === "entry"}
	class:thank-you={id === "thank-you"}
>
	{#each text as t}
		<p>{@html processText(t)}</p>
	{/each}
</div>

{#if cloud}
	<div class="image" {id} on:click={onClick}>
		<img
			srcset={`assets/img/panels/${id}-sm.png 800w, assets/img/panels/${id}-lg.png 1000w`}
			sizes={`(max-width: 600px) 800px, 1000px`}
			src={`assets/img/panels/${id}-lg.png`}
			class="cloud"
			{alt}
		/>

		{#if id === "show-you"}
			<div class="cloud-instruction">
				You can {$mq.desktop ? "click" : "tap"} on clouds to see them up close!
			</div>
		{:else if id === "body-color"}
			<div class="cloud-instruction">
				{$mq.desktop ? "Click" : "Tap"} to see this one up close, there's a lot there!
			</div>
		{/if}

		{#if overlay}
			<img
				srcset={`assets/img/panels/${id}2-sm.png 800w, assets/img/panels/${id}2-lg.png 1000w`}
				sizes={`(max-width: 600px) 800px, 1000px`}
				src={`assets/img/panels/${id}2-lg.png`}
				class="cloud overlay"
				class:visible={$currentPanel === i}
				{alt}
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
	.text.thank-you {
		width: 100%;
		margin-left: 0;
		max-width: 900px;
	}
	:global(.thank-you h2) {
		font-size: var(--24px);
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

	.cloud-instruction {
		width: 100%;
		position: absolute;
		top: -20%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		font-size: 0.7em;
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
