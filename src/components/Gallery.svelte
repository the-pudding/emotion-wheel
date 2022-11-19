<script>
	import Card from "$components/Gallery.Card.svelte";
	import { selectedGalleryImage } from "$stores/misc.js";

	export let images;
</script>

<div class="container" class:faded={$selectedGalleryImage}>
	{#each images as { id, title }}
		<Card {id} {title} />
	{/each}
</div>

<style>
	.container {
		position: absolute;
		visibility: visible;
		height: 75vh;
		display: grid;
		grid-template-rows: 50% 50%;
		grid-template-columns: auto auto auto auto auto;
	}
	.container.faded {
		opacity: 0.3;
	}
	.row {
		display: flex;
		justify-content: space-between;
		height: 50%;
	}
</style>
