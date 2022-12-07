<script>
	import BodyDraw from "$components/BodyDraw.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import { colors, words } from "$stores/misc.js";
	import { onMount } from "svelte";

	export let screenshotEl;
	export let showModal;

	let modalEl;
	let numFocusableElements;
	let firstFocusableElement;
	let lastFocusableElement;
	let i = Math.floor(Math.random() * $words.length);

	$: if (showModal && modalEl) modalEl.focus();
	$: color = $colors[i] ? $colors[i] : variables.color["grey-balloon"];

	const newWord = (e) => {
		const w = e.target.id.replace("body-interactive-", "");
		word = w;
		let i = $words.findIndex((d) => d === w);
		color = $colors[i] ? $colors[i] : variables.color["grey-balloon"];
	};

	const close = () => {
		showModal = false;
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
	class:visible={showModal}
	bind:this={modalEl}
	tabindex="-1"
	on:keydown={trapFocus}
>
	<BodyDraw {color} bind:screenshotEl />

	<button class="close " aria-label="close" on:click={close}
		><Icon name="x" /></button
	>
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
		font-size: var(--18px);
		box-shadow: rgb(50 50 93 / 25%) 0px 6px 12px -2px,
			rgb(0 0 0 / 30%) 0px 3px 7px -3px;
		border: 1px solid rgb(50 50 93 / 15%);
		height: 80vh;
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

	@media (max-height: 600px) {
		.close {
			top: 0.1em;
			right: 0.1em;
			font-size: 18px;
		}
	}
</style>
