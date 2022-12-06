<script>
	import { base } from "$app/paths";
	import copy from "$data/copy.json";
	import { entered, scrolled, scrollMax } from "$stores/misc.js";
	import { scaleLinear } from "d3-scale";
	import mq from "$stores/mq.js";

	$: zoom = zoomScale($scrolled);
	$: showText = $scrolled < 80;
	$: bgImage = `${base}/assets/img/notebook.jpeg`;

	const zoomScale = scaleLinear()
		.domain([0, $scrollMax])
		.range([1, 2.5])
		.clamp(true);

	const enter = () => {
		scrolled.set($scrollMax, { duration: $mq.reducedMotion ? 0 : 1000 });
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
		<div class="words" class:visible={showText}>
			<img class="logo" src="assets/img/logo_full.png" alt="pudding logo" />

			<h1>{@html copy.title}</h1>
			<div class="description">{@html copy.description}</div>
			<div>{@html copy.byline}</div>

			<button style="margin-top: 2em" class="click-anywhere" on:click={enter}>
				Click anywhere to continue
			</button>

			<div class="audio">FYI, this story contains audio.</div>

			<a href="/activities" class="audio" target="_blank"
				>Take me to the activities page</a
			>
		</div>
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
		top: 52%;
		transform: translate(0, -50%);
		opacity: 0;
		transition: opacity var(--1s);
		max-width: 60%;
	}
	.words.visible {
		opacity: 1;
	}
	h1 {
		font-size: 2.8em;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: -8px;
	}
	.audio {
		margin: 1em 0;
		font-size: 0.7em;
	}
	.click-anywhere {
		background: none;
	}

	@media (max-height: 400px) {
		.logo {
			margin-bottom: 0;
			margin-top: 2em;
		}
		h1 {
			margin-top: 0.2em;
			font-size: 2.5em;
			letter-spacing: -4px;
		}
		.words {
			font-size: 0.9em;
		}
	}
	@media (max-height: 300px) {
		h1 {
			font-size: 2em;
		}
	}
</style>
