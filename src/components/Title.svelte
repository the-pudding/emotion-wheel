<script>
	import { base } from "$app/paths";
	import copy from "$data/copy.json";
	import { entered, scrolled, scrollMax } from "$stores/misc.js";
	import { scaleLinear } from "d3-scale";
	import mq from "$stores/mq.js";
	import Button from "$components/Button.svelte";

	$: zoom = zoomScale($scrolled);
	$: showText = $scrolled < 80;
	$: bgImage = `${base}/assets/img/bg/notebook`;

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
		style={`background-image: -webkit-image-set(
			url(${bgImage}-sm.jpeg) 2x,
			url(${bgImage}-lg.jpeg) 1x); background-image: image-set(
			url(${bgImage}-sm.jpeg) 1x,
			url(${bgImage}-lg.jpeg) 2x)`}
	>
		<div class="words" class:visible={showText}>
			<img class="logo" src="assets/img/logo_full.png" alt="pudding logo" />

			<h1>{@html copy.title}</h1>
			<div class="description">{@html copy.description}</div>
			<div>{@html copy.byline}</div>

			<div class="buttons">
				<Button onClick={enter} color={"#8bcc8b"}>Enter the story</Button>
				<Button onClick={null} marginLeft={"8px"}>
					<a class="activities" href="/activities" target="_blank"
						>Activities page</a
					>
				</Button>
			</div>

			<div class="audio">FYI, this story contains audio.</div>
		</div>
	</div>
</div>

<style>
	a.logo-link,
	a.activities {
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

	.words {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: fixed;
		top: 52%;
		transform: translate(0, -50%);
		opacity: 0;
		transition: opacity var(--1s);
		max-width: 47%;
	}
	.words.visible {
		opacity: 1;
	}
	h1 {
		font-size: 2.3em;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: -4px;
	}
	.audio {
		margin: 1em 0;
		font-size: 0.7em;
	}

	a.activities {
		font-size: var(--16px);
	}
	.buttons {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1em;
	}

	@media (max-height: 400px) {
		.logo {
			margin-bottom: 0;
			margin-top: 2em;
		}
		h1 {
			margin-top: 0.2em;
			margin-bottom: 0.1em;
			font-size: 2em;
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
