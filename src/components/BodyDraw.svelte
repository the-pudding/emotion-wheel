<script>
	import viewport from "$stores/viewport.js";
	import { soundOn } from "$stores/misc.js";
	import { base } from "$app/paths";
	import { onMount, onDestroy } from "svelte";
	import ColorPicker from "$components/ColorPicker.svelte";
	import Button from "$components/Button.svelte";

	export let screenshotEl;
	export let color = "rgb(0,0,0)";

	$: bgImage = `${base}/assets/img/blank_body.png`;
	$: canvasHeight = $viewport.height * 0.5;
	$: canvasWidth = canvasHeight * 0.6;
	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	let canvas;
	let ctx;
	let painting = false;
	let mouseX;
	let mouseY;
	let showCursor = false;
	const sound = new Howl({
		src: [`${base}/assets/sound/select.wav`],
		volume: 0.3
	});

	const onMouseDown = (e) => {
		painting = true;
		onMouseMove(e);
	};
	const onMouseUp = () => {
		painting = false;
		ctx.beginPath();
	};
	const onMouseMove = (e) => {
		mouseX = e.offsetX
			? e.offsetX
			: e.targetTouches[0]
			? e.targetTouches[0].pageX - screenshotEl.getBoundingClientRect().left
			: e.changedTouches[e.changedTouches.length - 1].pageX;
		mouseY = e.offsetY
			? e.offsetY
			: e.targetTouches[0]
			? e.targetTouches[0].pageY - screenshotEl.getBoundingClientRect().top
			: e.changedTouches[e.changedTouches.length - 1].pageY;

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

	const onTouchStart = (e) => {
		painting = true;
		onMouseMove(e);
	};
	const onTouchEnd = () => {
		onMouseUp();
	};
	const onTouchMove = (e) => {
		onMouseMove(e);
	};

	const clear = () => {
		sound.play();
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	};

	onMount(() => {
		ctx = canvas.getContext("2d");
	});
	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="body-draw">
	<div class="color-picker">
		<ColorPicker bind:color />

		<Button onClick={clear} small={true}>clear</Button>
	</div>

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
			on:touchstart|preventDefault={onTouchStart}
			on:touchend|preventDefault={onTouchEnd}
			on:touchmove|preventDefault={onTouchMove}
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
</div>

<style>
	.body-draw {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		width: 100%;
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
