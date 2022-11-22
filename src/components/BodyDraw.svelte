<script>
	import viewport from "$stores/viewport.js";
	import { base } from "$app/paths";
	import { onMount } from "svelte";
	import ColorPicker from "$components/ColorPicker.svelte";

	export let screenshotEl;
	export let color = "rgb(0,0,0)";

	$: bgImage = `${base}/assets/img/blank_body.png`;
	$: canvasHeight = $viewport.height * 0.5;
	$: canvasWidth = canvasHeight * 0.6;

	let canvas;
	let ctx;
	let painting = false;
	let mouseX;
	let mouseY;
	let showCursor = false;

	const onMouseDown = (e) => {
		painting = true;
		onMouseMove(e);
	};
	const onMouseUp = () => {
		painting = false;
		ctx.beginPath();
	};
	const onMouseMove = (e) => {
		mouseX = e.offsetX;
		mouseY = e.offsetY;

		if (!painting) return;

		ctx.lineWidth = 4;
		ctx.lineCap = "round";
		ctx.lineTo(mouseX, mouseY);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(mouseX, mouseY);
	};
	const onMouseEnter = () => {
		showCursor = true;
	};
	const onMouseLeave = () => {
		showCursor = false;
	};
	const clear = () => {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	};

	onMount(() => {
		ctx = canvas.getContext("2d");
	});
</script>

<div class="body-draw">
	<div class="canvas" bind:this={screenshotEl}>
		<canvas
			bind:this={canvas}
			height={canvasHeight}
			width={canvasWidth}
			on:mousedown={onMouseDown}
			on:mouseup={onMouseUp}
			on:mousemove={onMouseMove}
			on:mouseenter={onMouseEnter}
			on:mouseleave={onMouseLeave}
			style={`background-image: url(${bgImage})`}
		/>

		<div
			class="cursor"
			class:visible={showCursor}
			style:left={`${mouseX}px`}
			style:top={`${mouseY}px`}
			style={`--color: ${color}`}
		/>
	</div>

	<div class="color-picker">
		<ColorPicker bind:color />

		<button class="skip" on:click={clear}>clear</button>
	</div>
</div>

<style>
	.body-draw {
		display: flex;
		align-items: center;
	}
	canvas {
		background-size: contain;
		background-position: center center;
		background-repeat: no-repeat;
	}
	canvas:hover {
		cursor: none;
	}
	.cursor {
		height: 10px;
		width: 10px;
		transform: translate(-50%, -50%);
		border-radius: 5px;
		background-color: var(--color);
		position: absolute;
		pointer-events: none;
		visibility: hidden;
	}
	.cursor.visible {
		visibility: visible;
	}
	button.skip {
		margin-top: 1em;
	}

	.canvas {
		position: relative;
	}
	.color-picker {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 3em;
	}
</style>