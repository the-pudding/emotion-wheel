<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { inModal } from "$stores/misc.js";
	import { onMount } from "svelte";

	export let visible;
	export let maxHeight;
	export let closeBtn = true;

	$: if (visible && modalEl) modalEl.focus();
	$: $inModal = visible;

	let modalEl;
	let numFocusableElements;
	let firstFocusableElement;
	let lastFocusableElement;

	const close = () => {
		visible = false;
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

	onMount(() => {
		numFocusableElements = modalEl.querySelectorAll("button,a").length;
		firstFocusableElement = modalEl.querySelectorAll("button,a")[0];
		lastFocusableElement =
			modalEl.querySelectorAll("button,a")[numFocusableElements - 1];
	});
</script>

<div
	class="modal"
	class:big={maxHeight}
	tabindex="-1"
	class:visible
	bind:this={modalEl}
	on:keydown={trapFocus}
>
	<slot />

	{#if closeBtn}
		<button class="close " aria-label="close" on:click={close}
			><Icon name="x" /></button
		>
	{/if}
</div>

<style>
	.modal {
		position: fixed;
		background: white;
		z-index: 100;
		visibility: hidden;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		padding: 5em 3em;
		justify-content: center;
		box-shadow: rgb(50 50 93 / 25%) 0px 6px 12px -2px,
			rgb(0 0 0 / 30%) 0px 3px 7px -3px;
		border: 1px solid rgb(50 50 93 / 15%);
		max-height: 80vh;
	}
	.modal.big {
		max-height: 90vh;
		height: 90vh;
	}
	.visible {
		visibility: visible;
	}
	.close {
		color: rgb(50 50 93 / 60%);
		position: absolute;
		top: 1em;
		right: 1em;
		padding-bottom: 0;
		font-size: 24px;
		background: none;
	}
	.close:hover {
		cursor: pointer;
		color: rgb(50 50 93 / 100%);
	}

	@media (max-height: 600px) {
		.modal {
			padding: 1em;
		}
		.close {
			top: 0.1em;
			right: 0.1em;
			font-size: 18px;
		}
	}
</style>
