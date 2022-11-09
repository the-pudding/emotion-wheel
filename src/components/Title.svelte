<script>
	import { base } from "$app/paths";
	import copy from "$data/copy.json";
	import { fade } from "svelte/transition";
	import { entered } from "$stores/misc.js";
	import { scaleLinear } from "d3-scale";
	import Icon from "$components/helpers/Icon.svelte";

	export let scrolled;
	export let scrollMax;

	$: zoom = zoomScale(scrolled);
	$: showText = scrolled < 80;
	$: bgImage = `${base}/assets/img/notebook.jpeg`;

	const zoomScale = scaleLinear()
		.domain([0, scrollMax])
		.range([1, 2.5])
		.clamp(true);

	const enter = () => {
		scrolled = scrollMax;
	};
</script>

<div
	class="title-wrapper"
	style={`transform: scale(${zoom})`}
	class:visible={!$entered}
>
	<div class="title" style={`background-image: url(${bgImage})`}>
		{#if showText}
			<div class="words" transition:fade>
				<a href="https://pudding.cool" aria-label="The Pudding" target="_blank">
					<img class="logo" src="assets/img/logo_full.png" />
				</a>

				<h1>{@html copy.title}</h1>
				<div>{@html copy.description}</div>
				<div>{@html copy.byline}</div>

				<div class="scroll">Scroll to begin</div>
				<div class="mouse">
					<span class="icon"><Icon name="arrow-down" /></span>
				</div>

				<!-- <a class="wheel" href={`${base}/wheel`}>Go to the emotion wheel</a> -->

				<!-- <button on:click={enter}>enter (mobile only)</button> -->
			</div>
		{/if}
	</div>
</div>

<style>
	a:not(.wheel) {
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
	.spacer {
		height: 100%;
		flex-shrink: 0;
		position: absolute;
		right: 0;
		top: 0;
		background: grey;
		opacity: 0.3;
	}
	.scroll {
		margin-top: 4em;
		margin-bottom: 10px;
		font-size: var(--16px);
		/* font-family: var(--sans); */
	}
	.mouse {
		background: white;
		border: 1px solid rgb(15 15 15 / 20%);
		border-radius: 15px;
		width: 30px;
		height: 46px;
		box-shadow: 0 2px 4px rgb(15 15 15 / 20%);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		position: relative;
		color: var(--color-gray-600);
	}
	.icon {
		position: absolute;
		animation: moveArrow 1.5s linear infinite;
	}

	@keyframes moveArrow {
		0% {
			opacity: 0;
			top: -10%;
		}

		50% {
			opacity: 1;
			top: 30%;
		}

		100% {
			opacity: 0;
			top: 70%;
		}
	}
</style>
