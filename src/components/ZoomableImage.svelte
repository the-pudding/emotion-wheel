<script>
	import { zoom, select, zoomIdentity } from "d3";
	import { onMount } from "svelte";
	import Comment from "$components/Comment.svelte";
	import mq from "$stores/mq.js";
	import { modalAlt, showComments } from "$stores/misc.js";
	import Button from "$components/Button.svelte";
	import Toggle from "$components/helpers/Toggle.svelte";

	export let src;
	export let comments;

	let outer;
	let imageWrapper;
	let zoomableHeight;
	let zoomableWidth;
	let z;
	let toggleValue = "on";

	$: $showComments = toggleValue === "on" ? true : false;
	$: isGallery = src && src.includes("gallery");
	$: isBodyDiagram = src === "assets/img/panels/body-color2";
	$: src, zoomableWidth, imageUpdate();

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

	const setupZoom = () => {
		if (src) {
			zoomableHeight = zoomableWidth;

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

	const hideComments = () => {
		$showComments = !$showComments;
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

		{#if isBodyDiagram}
			<img
				srcset={`${src}-lg.png 1000w, ${src}-xl.png 2000w`}
				sizes={`(max-width: 600px) 1000px, 2000px`}
				src={`${src}-lg.png`}
				alt={$modalAlt ? $modalAlt : null}
			/>
		{:else if src}
			<img
				srcset={`${src}-sm.png 1000w, ${src}-lg.png 1920w`}
				sizes={`(max-width: 600px) 1000px, 1920px`}
				src={`${src}-lg.png`}
				alt={$modalAlt ? $modalAlt : null}
			/>
		{/if}
	</div>
</div>

<div class="sidebar">
	<div class="zoom">
		<div class="zoom-title">Zoom</div>
		<div class="buttons">
			<Button
				onClick={zoomIn}
				width={"1.6em"}
				height={"1.6em"}
				big={true}
				animate={false}>+</Button
			>
			<Button
				onClick={zoomOut}
				width={"1.6em"}
				height={"1.6em"}
				big={true}
				animate={false}>-</Button
			>
		</div>
	</div>
	{#if isGallery}
		<Toggle label={"Abby's comments 💡"} bind:value={toggleValue} />
	{/if}
</div>

<style>
	.image-wrapper {
		transform-origin: 0px 0px;
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.outer {
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	.zoom-title {
		text-align: center;
		margin-bottom: 6px;
	}
	.sidebar {
		display: flex;
		flex-direction: column;
		height: calc(100% - 4em);
		justify-content: space-between;
		position: absolute;
		left: 1em;
		top: 2em;
		font-size: 0.7em;
	}
	button {
		font-size: 1.7em;
		line-height: 0;
		width: 1.6em;
		height: 1.6em;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.zoom {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
