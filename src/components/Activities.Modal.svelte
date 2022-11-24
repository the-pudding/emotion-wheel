<script>
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import BodyDraw from "$components/BodyDraw.svelte";
	import NeedsChecklist from "$components/NeedsChecklist.svelte";
	import slices from "$svg/slices.svg";
	import checks from "$svg/needs-activities.svg";
	import { toPng } from "html-to-image";

	export let currentActivity;
	export let words;
	export let bodyImage;
	export let needs;

	let screenshotEl;

	const screenshot = async () => {
		let png = await toPng(screenshotEl);
		let img = new Image();
		img.src = png;
		bodyImage = img;
	};

	const clearNeeds = () => {
		needs = [];
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
				imgSrc={`assets/activities/wheel.png`}
				wheelId="the-wheel"
				bind:selected={words}
				withColor={true}
			/>
		</div>
	{:else if currentActivity === "body"}
		<div class="body">
			<div class="description">
				Take a breath– scan from the top of your head down through your chest,
				down into your toes. Make a mark on the diagram on the right based on
				what you notice.
			</div>
			<BodyDraw bind:screenshotEl />
		</div>
	{:else if currentActivity === "needs"}
		<div class="needs">
			<h1>What do you need?</h1>
			<button on:click={clearNeeds} class="skip">clear</button>
			<NeedsChecklist
				{checks}
				imgSrc={"assets/activities/needs.png"}
				wheelId={"needs-activities"}
				bind:selected={needs}
			/>
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
	.body .description {
		text-align: center;
		max-width: 600px;
		margin-bottom: 4em;
	}
	.needs {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.close {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
