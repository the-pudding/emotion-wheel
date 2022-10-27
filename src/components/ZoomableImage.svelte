<script>
	import { zoom, select, zoomIdentity } from "d3";
	import { afterUpdate, onMount, tick } from "svelte";
	import loadImage from "$utils/loadImage.js";

	export let src;

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
		select(outer).call(z.scaleBy, 0.5);
	};

	const imageUpdate = async () => {
		if (z) {
			select(outer).call(z.transform, zoomIdentity);
		}

		if (src !== "") {
			setupZoom();
		}
	};

	const setupZoom = () => {
		// note to self: clientheight is 0, which is weird. we need a way to get the w/h of the image, could do that with load image as well.
		console.log(select(imageWrapper));
		console.log("setup", { zoomableWidth, zoomableHeight });
		z = zoom()
			.scaleExtent([1, 4])
			.translateExtent([
				[0, 0],
				[zoomableWidth, zoomableHeight]
			])
			.on("zoom", handleZoom);
		select(outer).call(z);
	};

	onMount(async () => {
		setupZoom();
	});
</script>

<div class="outer" bind:this={outer}>
	<div
		class="image-wrapper"
		bind:this={imageWrapper}
		bind:clientWidth={zoomableWidth}
		bind:clientHeight={zoomableHeight}
	>
		<img {src} />
	</div>
</div>

<div class="buttons">
	<button>+</button>
	<button>-</button>
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
	.buttons {
		position: absolute;
		left: 0;
		top: 0;
	}
	img {
		max-height: 85vh;
	}
</style>
