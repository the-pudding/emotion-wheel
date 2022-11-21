<script>
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import BodyDraw from "$components/BodyDraw.svelte";
	import ColorPicker from "$components/ColorPicker.svelte";
	import slices from "$svg/slices.svg";
	import { toPng } from "html-to-image";

	export let currentActivity;
	export let words;
	export let bodyImage;
	let color;
	let screenshotEl;

	const screenshot = async () => {
		let png = await toPng(screenshotEl);
		let img = new Image();
		img.src = png;
		bodyImage = img;
	};

	const close = async () => {
		if (currentActivity === "body") await screenshot();
		currentActivity = undefined;
	};
</script>

<div class="modal" class:visible={currentActivity}>
	<button on:click={close} class="close">close</button>
	{#if currentActivity === "wheel"}
		<div class="wheel">
			<h1>Hi, how are you feeling?</h1>

			<ClickableWheel
				{slices}
				imgSrc={`../assets/activities/wheel.png`}
				wheelId="the-wheel"
				bind:selected={words}
			/>
		</div>
	{:else if currentActivity === "body"}
		<div class="body">
			<BodyDraw bind:screenshotEl />
		</div>
	{/if}
</div>

<style>
	.modal {
		position: fixed;
		width: 90%;
		height: 90%;
		background: var(--color-gray-100);
		visibility: hidden;
	}
	.modal.visible {
		visibility: visible;
	}
	.wheel {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.body {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.close {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
