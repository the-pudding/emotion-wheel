<script>
	import Card from "$components/Gallery.Card.svelte";
	import { selectedGalleryImage } from "$stores/misc.js";

	export let images;
</script>

<div class="container" class:faded={$selectedGalleryImage}>
	<div class="row">
		{#each images.slice(0, 4) as { id, title }}
			<Card {id} {title} />
		{/each}
	</div>

	<div class="row">
		{#each images.slice(4) as { id, title }}
			<Card {id} {title} />
		{/each}
	</div>
</div>

<style>
	.container {
		position: absolute;
		visibility: visible;
		height: 75vh;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.row {
		display: flex;
		height: 50%;
	}
	.container.faded {
		opacity: 0.3;
	}
</style>
