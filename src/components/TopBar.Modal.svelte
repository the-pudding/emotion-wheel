<script>
	import { showPlain, showInfo, soundOn } from "$stores/misc.js";
	import Icon from "$components/helpers/Icon.svelte";
	import copy from "$data/copy.json";
	import { onMount } from "svelte";

	$: if ($showInfo && modalEl) modalEl.focus();

	let modalEl;
	let numFocusableElements;
	let firstFocusableElement;
	let lastFocusableElement;

	const close = () => {
		$showInfo = false;
	};
	const plain = () => {
		$showPlain = true;
		$showInfo = false;
		$soundOn = false;
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
	tabindex="-1"
	class:visible={$showInfo}
	bind:this={modalEl}
	on:keydown={trapFocus}
>
	{#each copy.info as text}
		<div>{@html text}</div>
	{/each}

	<div>
		If you'd like to read a text version of the piece, <button
			class="skip"
			on:click={plain}>click here</button
		>.
	</div>
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
	}
	.modal div {
		margin: 0.5em 0;
	}
	.visible {
		visibility: visible;
	}
	button.skip {
		border: none;
		font-family: var(--serif);
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
