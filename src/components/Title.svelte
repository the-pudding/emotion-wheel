<script>
	import { base } from "$app/paths";
	import copy from "$data/copy.json";
	import { fade } from "svelte/transition";
	import { entered, scrolled, scrollMax } from "$stores/misc.js";
	import { scaleLinear } from "d3-scale";

	$: zoom = zoomScale($scrolled);
	$: showText = $scrolled < 80;
	$: bgImage = `${base}/assets/img/notebook.jpeg`;

	const zoomScale = scaleLinear()
		.domain([0, $scrollMax])
		.range([1, 2.5])
		.clamp(true);

	const enter = () => {
		scrolled.set($scrollMax, { duration: 1000 });
	};
</script>

<div
	class="title-wrapper"
	style={`transform: scale(${zoom})`}
	class:visible={!$entered}
>
	<div
		class="title"
		style={`background-image: url(${bgImage})`}
		on:click={enter}
	>
		{#if showText}
			<div class="words" transition:fade>
				<img class="logo" src="assets/img/logo_full.png" alt="pudding logo" />

				<h1>{@html copy.title}</h1>
				<div class="description">{@html copy.description}</div>
				<div>{@html copy.byline}</div>

				<div style="margin-top: 2em">Click anywhere to continue</div>

				<div class="audio">FYI, this story contains audio.</div>
			</div>
		{/if}
	</div>
</div>

<style>
	a.logo-link {
		border-bottom: none;
	}
	.title-wrapper {
		position: absolute;
		display: none;
		height: 100%;
	}
	.visible {
		display: block;
		z-index: 2;
	}
	.description {
		margin: 0 0 1em 0;
	}
	.logo {
		height: 2.3em;
	}
	.title {
		width: 100vw;
		height: 100%;
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
	.title:hover {
		cursor: pointer;
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
	.audio {
		font-size: var(--16px);
		margin: 1em 0;
	}

	@media (max-height: 600px) {
		.audio {
			font-size: var(--12px);
		}
	}
</style>
