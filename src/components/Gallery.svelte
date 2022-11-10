<script>
	import Card from "$components/Gallery.Card.svelte";
	import { selectedGalleryImage } from "$stores/misc.js";
</script>

<div class="container" class:faded={$selectedGalleryImage}>
	<div class="row">
		<Card img="george_floyd_6.png" title="George Floyd protests" />
		<Card img="dress.png" title="Dress" />
		<Card img="suit.png" title="Suit" />
		<Card img="family.png" title="Family" />
	</div>
	<div class="row">
		<Card img="pronouns.png" title="Pronouns" />
		<Card img="the_things_color.png" title="Life audit" />
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
