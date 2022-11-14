<script>
	import { base } from "$app/paths";
	import viewport from "$stores/viewport.js";
	import { onMount } from "svelte";
	import ColorPicker from "$components/ColorPicker.svelte";
	import { words, colors, bodyDrawing } from "$stores/misc.js";
	import _ from "lodash";
	import { toPng } from "html-to-image";

	export let text;

	let canvas;
	let canvasWrapper;
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

	const screenshot = async () => {
		let png = await toPng(canvasWrapper);
		let img = new Image();
		img.src = png;
		$bodyDrawing = img;
	};

	onMount(() => {
		document.querySelector("span#body-word").innerHTML = word;
		ctx = canvas.getContext("2d");
	});
</script>

<div class="container">
	<div class="words">
		{#each text as t}
			<p>{@html t}</p>
		{/each}
	</div>

	<div class="interactive">
		<div class="canvas" bind:this={canvasWrapper}>
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
			<button class="confirm" on:click={screenshot}>that's it</button>
		</div>
	</div>
</div>

<style>
	.container {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100%;
	}
	.words {
		width: 20%;
		margin-left: 10%;
	}
	.interactive {
		display: flex;
		width: 70%;
		position: relative;
		align-items: center;
	}
	.word {
		font-weight: bold;
	}
	button.skip {
		margin-top: 1em;
	}
	:global(span#body-word) {
		font-weight: bold;
		text-decoration: underline;
	}
	.canvas {
		position: relative;
	}
	.color-picker {
		display: flex;
		flex-direction: column;
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
</style>
