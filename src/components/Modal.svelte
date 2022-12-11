<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { inModal } from "$stores/misc.js";
	import { createEventDispatcher, onMount } from "svelte";
	import { zoomModalImage } from "$stores/misc.js";

	export let visible;
	export let big = false;
	export let hasClose = true;
	export let closeBtn;

	$: if (visible && modalEl) modalEl.focus();
	$: $inModal = visible;

	let modalEl;
	let numFocusableElements;
	let firstFocusableElement;
	let lastFocusableElement;

	const dispatch = createEventDispatcher();

	const close = () => {
		$zoomModalImage = null;
		visible = false;
		dispatch("close");
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
		const selectables = "path, rect, button, a";
		numFocusableElements = modalEl.querySelectorAll(selectables).length;
		firstFocusableElement = modalEl.querySelectorAll(selectables)[0];
		lastFocusableElement =
			modalEl.querySelectorAll(selectables)[numFocusableElements - 1];
	});
</script>

<div
	class="modal"
	class:big
	tabindex="-1"
	class:visible
	bind:this={modalEl}
	on:keydown={trapFocus}
>
	<slot />

	{#if hasClose}
		<button
			bind:this={closeBtn}
			class="close"
			aria-label="close"
			on:click={close}><Icon name="x" /></button
		>
	{/if}
</div>

<style>
	.modal {
		position: fixed;
		background: white;
		z-index: 100;
		display: none;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		flex-direction: column;
		padding: 5em 3em;
		justify-content: center;
		box-shadow: rgb(50 50 93 / 25%) 0px 6px 12px -2px,
			rgb(0 0 0 / 30%) 0px 3px 7px -3px;
		border: 1px solid rgb(50 50 93 / 15%);
		max-height: 90vh;
		max-width: 90vw;
	}
	.modal.big {
		width: 90vw;
		height: 90vh;
		padding: 1em;
	}
	.visible {
		display: flex;
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
