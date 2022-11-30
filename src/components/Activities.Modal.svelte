<script>
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import BodyDraw from "$components/BodyDraw.svelte";
	import NeedsChecklist from "$components/NeedsChecklist.svelte";
	import slices from "$svg/slices.svg";
	import checks from "$svg/needs-activities.svg";
	import { toPng } from "html-to-image";
	import { onMount, tick } from "svelte";
	import { base } from "$app/paths";

	export let currentActivity;
	export let words;
	export let bodyImage;
	export let needs;

	let closeBtn;
	let screenshotEl;
	let modal;
	let numFocusableElements;
	let firstFocusableElement;
	let lastFocusableElement;

	$: if (modal && currentActivity) focusModal();

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

	const trapFocus = (e) => {
		const tabPressed = e.key === "Tab" || e.keyCode === 9;
		if (!tabPressed) return;

		if (e.shiftKey) {
			if (document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastFocusableElement) {
				firstFocusableElement.focus();
				e.preventDefault();
			}
		}
	};

	const focusModal = async () => {
		await tick();
		modal.focus();
		const selectables = "path, rect, button";
		numFocusableElements = modal.querySelectorAll(selectables).length;
		firstFocusableElement = modal.querySelectorAll(selectables)[0];
		lastFocusableElement =
			modal.querySelectorAll(selectables)[numFocusableElements - 1];
	};
</script>

<div
	class="modal"
	tabindex="-1"
	bind:this={modal}
	class:visible={currentActivity}
	on:keydown={trapFocus}
>
	<button bind:this={closeBtn} on:click={close} class="close" aria-label="close"
		>close</button
	>
	{#if currentActivity === "wheel"}
		<div class="wheel">
			<h2>Hi, how are you feeling?</h2>

			<ClickableWheel
				{slices}
				imgSrc={`assets/activities/wheel.png`}
				wheelId="the-wheel"
				bind:selected={words}
				withColor={true}
				nextSelectable={closeBtn}
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
			<h2>What do you need?</h2>
			<button on:click={clearNeeds} class="skip">clear</button>
			<NeedsChecklist
				{checks}
				imgSrc={"assets/activities/needs.png"}
				wheelId={"needs-activities"}
				bind:selected={needs}
				nextSelectable={closeBtn}
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
