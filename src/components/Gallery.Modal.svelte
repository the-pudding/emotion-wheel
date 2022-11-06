<script>
	import Icon from "$components/helpers/Icon.svelte";
	import ZoomableImage from "$components/ZoomableImage.svelte";
	import { selectedGalleryImage } from "$stores/misc.js";

	let modal;
	const close = () => {
		$selectedGalleryImage = undefined;
	};
</script>

<div class="modal" bind:this={modal} class:visible={$selectedGalleryImage}>
	<ZoomableImage
		src={$selectedGalleryImage
			? `assets/img/gallery/${$selectedGalleryImage}`
			: ""}
	/>
	<div class="close" on:click={close}><Icon name="x" /></div>
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
		transition: opacity 1s;
		background: var(--color-bg);
		visibility: visible;
		box-shadow: rgb(50 50 93 / 25%) 0px 6px 12px -2px,
			rgb(0 0 0 / 30%) 0px 3px 7px -3px;
		border: 1px solid rgb(50 50 93 / 15%);
		border-radius: 6px;
	}
	.modal.visible {
		opacity: 1;
		z-index: 2;
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
		font-size: 24px;
	}
	.close:hover {
		cursor: pointer;
		color: rgb(50 50 93 / 100%);
	}
</style>
