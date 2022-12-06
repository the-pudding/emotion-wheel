<script>
	import Icon from "$components/helpers/Icon.svelte";
	import ZoomableImage from "$components/ZoomableImage.svelte";
	import { zoomModalImage } from "$stores/misc.js";
	import { onMount } from "svelte";
	import copy from "$data/copy.json";

	let modal;

	$: visible = $zoomModalImage;
	$: comments = copy.gallery.filter((d) => d.id === $zoomModalImage)[0]
		? copy.gallery.filter((d) => d.id === $zoomModalImage)[0].comments
		: [];
	$: if (visible && modal) modal.focus();

	let numFocusableElements;
	let firstFocusableElement;
	let lastFocusableElement;

	const trapFocus = (e) => {
		if (!$zoomModalImage) return;

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

	const close = () => {
		let id = $zoomModalImage.includes("/")
			? $zoomModalImage.split("/")[1]
			: $zoomModalImage;
		if (id[id.length - 1] === "2") id = id.substring(0, id.length - 1);
		document.querySelector(`#${id}`).focus();
		$zoomModalImage = undefined;
	};

	onMount(() => {
		numFocusableElements = modal.querySelectorAll("button").length;
		firstFocusableElement = modal.querySelectorAll("button")[0];
		lastFocusableElement =
			modal.querySelectorAll("button")[numFocusableElements - 1];
	});
</script>

<div
	class="modal"
	bind:this={modal}
	tabindex="-1"
	class:visible
	on:keydown={trapFocus}
>
	<ZoomableImage
		src={visible ? `assets/img/${$zoomModalImage}.png` : ""}
		{comments}
	/>
	<button class="close" aria-label="close" on:click={close}
		><Icon name="x" /></button
	>
</div>

<style>
	.modal {
		width: 90vw;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: -1;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity var(--1s);
		background: var(--color-bg);
		visibility: visible;
		box-shadow: rgb(50 50 93 / 25%) 0px 6px 12px -2px,
			rgb(0 0 0 / 30%) 0px 3px 7px -3px;
		border: 1px solid rgb(50 50 93 / 15%);
		border-radius: 6px;
	}
	.modal.visible {
		opacity: 1;
		z-index: 100;
	}
	.modal:hover {
		cursor: grab;
	}
	.modal:active {
		cursor: grabbing;
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
	.close:hover {
		cursor: pointer;
		color: rgb(50 50 93 / 100%);
	}
</style>
