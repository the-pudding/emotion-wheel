<script>
	import Card from "$components/Gallery.Card.svelte";
	import { selectedGalleryImage } from "$stores/misc.js";
</script>

<div class="container" class:faded={$selectedGalleryImage}>
	<div class="row">
		<Card id="george_floyd_6" title="George Floyd protests" />
		<Card id="dress" title="Dress" />
		<Card id="suit" title="Suit" />
		<Card id="family" title="Family" />
	</div>
	<div class="row">
		<Card id="pronouns" title="Pronouns" />
		<Card id="the_things_color" title="Life audit" />
	</div>
</div>

<style>
	.container {
		position: absolute;
		visibility: visible;
		height: 75vh;
		display: flex;
		flex-direction: column;
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
