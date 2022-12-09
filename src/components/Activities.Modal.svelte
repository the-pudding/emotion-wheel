<script>
	import Icon from "$components/helpers/Icon.svelte";
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import BodyDraw from "$components/BodyDraw.svelte";
	import NeedsChecklist from "$components/NeedsChecklist.svelte";
	import Button from "$components/Button.svelte";
	import slices from "$svg/slices.svg";
	import checks from "$svg/needs-activities.svg";
	import { toPng } from "html-to-image";
	import { tick } from "svelte";
	import copy from "$data/copy.json";

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
	<button bind:this={closeBtn} class="close" aria-label="close" on:click={close}
		><Icon name="x" /></button
	>

	{#if currentActivity === "wheel"}
		<div class="wheel">
			<h2>Hi, how are you feeling?</h2>
			<details class="description">
				<summary>How to use this</summary>
				<p>{@html copy.activitiesPage.wheel}</p>
			</details>

			<ClickableWheel
				{slices}
				imgSrc={`../assets/activities/wheel`}
				wheelId="the-wheel"
				bind:selected={words}
				withColor={true}
				nextSelectable={closeBtn}
			/>
		</div>
	{:else if currentActivity === "body"}
		<div class="body">
			<h2>Where do you feel it in your body?</h2>
			<details class="description">
				<summary>How to use this</summary>
				<p>{@html copy.activitiesPage.body}</p>
			</details>

			<BodyDraw bind:screenshotEl />
		</div>
	{:else if currentActivity === "needs"}
		<div class="needs">
			<h2>What do you need?</h2>
			<details class="description">
				<summary>How to use this</summary>
				<p>{@html copy.activitiesPage.needs}</p>
			</details>

			<Button onClick={clearNeeds} small={true}>clear</Button>
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
	.description {
		text-align: center;
		max-width: 600px;
		margin: 1em 0;
	}
	.description:hover {
		cursor: pointer;
	}
	.needs {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.close {
		color: rgb(50 50 93 / 60%);
		position: absolute;
		top: 16px;
		right: 16px;
		padding-bottom: 0;
		font-size: 24px;
		background: none;
	}
</style>
