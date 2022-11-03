<script>
	import { base } from "$app/paths";
	import copy from "$data/copy.json";
	import { fade } from "svelte/transition";
	import { entered } from "$stores/misc.js";
	import { scaleLinear } from "d3-scale";

	export let scrolled;
	export let scrollMax;

	const zoomScale = scaleLinear()
		.domain([0, scrollMax])
		.range([1, 2.5])
		.clamp(true);

	$: zoom = zoomScale(scrolled);
	$: showText = scrolled < 80;
	$: bgImage = `${base}/assets/img/notebook.jpeg`;
</script>

<div
	class="scaler"
	style={`transform: scale(${zoom})`}
	class:visible={!$entered}
>
	<a class="wheel" href="/wheel">Go to the emotion wheel</a>
	<div class="title" style={`background-image: url(${bgImage})`}>
		{#if showText}
			<div class="words" transition:fade>
				<a href="https://pudding.cool" aria-label="The Pudding" target="_blank">
					<img class="logo" src="assets/img/logo_full.png" />
				</a>

				<h1>{@html copy.title}</h1>
				<div>{@html copy.description}</div>
				<div>{@html copy.byline}</div>
				<div class="scroll">Scroll to continue -></div>
			</div>
		{/if}
	</div>
</div>

<style>
	a {
		border-bottom: none;
	}
	.scaler {
		position: absolute;
		visibility: hidden;
	}
	.visible {
		visibility: visible;
		z-index: 2;
	}
	.logo {
		height: 2.3em;
	}
	a.wheel {
		z-index: 5;
		position: absolute;
		top: 1em;
		left: 1em;
		background: white;
		padding: 0.3em;
	}

	.title {
		width: 100vw;
		height: 100vh;
		background-position: center;
		background-repeat: no-repeat;
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
		display: flex;
		flex-direction: column;
		align-items: center;
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
