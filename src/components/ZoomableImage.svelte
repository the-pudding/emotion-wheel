<script>
	import { zoom, select, zoomIdentity } from "d3";
	import { onMount } from "svelte";
	import loadImage from "$utils/loadImage.js";
	import viewport from "$stores/viewport.js";
	import Comment from "$components/Comment.svelte";
	import mq from "$stores/mq.js";

	export let src;
	export let comments;

	let outer;
	let imageWrapper;
	let zoomableHeight;
	let zoomableWidth;
	let z;

	$: src, imageUpdate();

	const handleZoom = (e) => {
		select(imageWrapper).style(
			"transform",
			`translate(${e.transform.x}px, ${e.transform.y}px) scale(${e.transform.k})`
		);
	};

	const zoomIn = () => {
		z.scaleBy(
			select(outer)
				.transition()
				.duration($mq.reducedMotion ? 0 : 250),
			1.3
		);
	};
	const zoomOut = () => {
		z.scaleBy(
			select(outer)
				.transition()
				.duration($mq.reducedMotion ? 0 : 250),
			1 / 1.3
		);
	};

	const imageUpdate = async () => {
		if (z) {
			select(outer).call(z.transform, zoomIdentity);
		}

		setupZoom();
	};

	const setupZoom = async () => {
		if (src !== "") {
			const i = await loadImage(src);
			let ratio = i.height / i.width;

			let actualHeight = ratio * zoomableWidth;
			zoomableHeight = Math.max($viewport.height * 0.7, actualHeight);

			z = zoom()
				.scaleExtent([1, 4])
				.translateExtent([
					[0, 0],
					[zoomableWidth, zoomableHeight]
				])
				.on("zoom", handleZoom);
			select(outer).call(z);
		}
	};

	onMount(async () => {
		setupZoom();
	});
</script>

<div class="outer" bind:this={outer} bind:clientWidth={zoomableWidth}>
	<div class="image-wrapper" bind:this={imageWrapper}>
		{#each comments as { text, location }}
			<Comment {text} {location} />
		{/each}

		<img {src} />
	</div>
</div>

<div class="buttons">
	<div class="zoom-title">Zoom</div>
	<button class="skip" on:click={zoomIn}>+</button>
	<button class="skip" on:click={zoomOut}>-</button>
</div>

<style>
	.image-wrapper {
		transform-origin: 0px 0px;
		display: flex;
		justify-content: center;
	}
	.outer {
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	.zoom-title {
		text-align: center;
		font-family: var(--sans);
		letter-spacing: normal;
		word-spacing: normal;
		margin-bottom: 6px;
	}
	.buttons {
		position: absolute;
		left: 16px;
		top: 16px;
		font-size: 0.7em;
	}
	button {
		font-size: 1.7em;
		line-height: 0;
		width: 1.6em;
		height: 1.6em;
	}
	img {
		max-height: 85vh;
	}
</style>
