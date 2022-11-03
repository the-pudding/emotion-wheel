<script>
	import { base } from "$app/paths";
	import viewport from "$stores/viewport.js";
	import { onMount } from "svelte";
	import ColorPicker from "$components/ColorPicker.svelte";
	import { words, colors } from "$stores/misc.js";
	import _ from "lodash";

	let canvas;
	let ctx;
	let painting = false;
	let mouseX;
	let mouseY;
	let showCursor = false;
	let word = _.sample($words);
	let color = _.sample($colors);

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
		mouseX = e.offsetX;
		mouseY = e.offsetY;

		if (!painting) return;

		ctx.lineWidth = 4;
		ctx.lineCap = "round";
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.offsetX, e.offsetY);
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

<p>
	Ok, so that's how feelings show up in my body/nervous system... how do they
	show up in yours?
</p>
<p>
	Where do you feel <span class="word">{word}</span>?
</p>

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

	<ColorPicker bind:color />
</div>

<style>
	.row {
		display: flex;
	}
	.word {
		font-weight: bold;
	}
	.container {
		position: relative;
	}
	canvas {
		background-size: contain;
		background-position: center center;
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
</style>
