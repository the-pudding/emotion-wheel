<script>
	import { base } from "$app/paths";
	import viewport from "$stores/viewport.js";
	import { onMount } from "svelte";
	import ColorPicker from "$components/ColorPicker.svelte";

	let canvas;
	let ctx;
	let painting = false;
	let color = "rgb(0, 0, 0)";

	$: canvasHeight = $viewport.height * 0.5;
	$: canvasWidth = canvasHeight;
	$: bgImage = `${base}/assets/img/blank_body.png`;

	const onMouseDown = (e) => {
		painting = true;
		onMouseMove(e);
	};
	const onMouseUp = () => {
		painting = false;
		ctx.beginPath();
	};
	const onMouseMove = (e) => {
		if (!painting) return;

		ctx.lineWidth = 4;
		ctx.lineCap = "round";
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.offsetX, e.offsetY);
	};
	const clear = () => {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	};

	onMount(() => {
		ctx = canvas.getContext("2d");
	});
</script>

<p>
	Ok, so that's how feelings show up in my body/nervous system... how do they
	show up in yours?
</p>
<p>Where do you feel <strong>frustration</strong>?</p>

<button on:click={clear}>clear</button>
<div class="row">
	<div class="container">
		<canvas
			bind:this={canvas}
			height={canvasHeight}
			width={canvasWidth}
			on:mousedown={onMouseDown}
			on:mouseup={onMouseUp}
			on:mousemove={onMouseMove}
			style={`background-image: url(${bgImage})`}
		/>
	</div>

	<ColorPicker bind:color />
</div>

<style>
	.row {
		display: flex;
	}
	.container {
		position: relative;
	}
	canvas {
		background-size: contain;
		background-position: center center;
	}
</style>
