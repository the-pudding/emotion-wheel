<script>
	import copy from "$data/copy.json";
	import { fade } from "svelte/transition";
	import { scaleLinear } from "d3-scale";

	export let scrolled;
	export let scrollMax;
	export let entered;

	const zoomScale = scaleLinear()
		.domain([0, scrollMax])
		.range([1, 2.5])
		.clamp(true);

	$: zoom = zoomScale(scrolled);
	$: showText = scrolled < 80;
</script>

<div
	class="scaler"
	style={`transform: scale(${zoom})`}
	class:visible={!entered}
>
	<div class="title">
		{#if showText}
			<div class="words" transition:fade>
				<img class="logo" src="assets/img/logo_full.png" />
				<h1>{@html copy.title}</h1>
				<div>{@html copy.description}</div>
				<div>{@html copy.byline}</div>
				<div class="scroll">Scroll to continue -></div>
			</div>
		{/if}
	</div>
</div>

<style>
	.scaler {
		position: absolute;
		visibility: hidden;
	}
	.visible {
		visibility: visible;
	}
	.logo {
		position: absolute;
		top: 0;
		height: 2.3em;
		left: 50%;
		transform: translate(-50%, -200%);
	}

	.title {
		width: 100vw;
		height: 100vh;
		background: url("assets/img/notebook.jpeg") no-repeat center center fixed;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;

		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.words {
		position: fixed;
		top: 55%;
		transform: translate(0, -50%);
	}
	h1 {
		font-size: 3em;
		font-family: var(--font-titles);
		font-weight: bold;
	}
	.scroll {
		margin-top: 3em;
	}
	.spacer {
		height: 100vh;
		flex-shrink: 0;
		position: absolute;
		right: 0;
		top: 0;
		background: grey;
		opacity: 0.3;
	}
</style>
