<script>
	import Card from "$components/Gallery.Card.svelte";
	import Modal from "$components/Gallery.Modal.svelte";

	let selected;
</script>

<div class="container" class:faded={selected}>
	<div class="row">
		<Card
			img="george_floyd_6.png"
			title="George Floyd protests"
			bind:selected
		/>
		<Card img="dress.png" title="Dress" bind:selected />
		<Card img="suit.png" title="Suit" bind:selected />
		<Card img="family.png" title="Family" bind:selected />
	</div>
	<div class="row">
		<Card img="pronouns.png" title="Pronouns" bind:selected />
		<Card img="the_things_color.png" title="Life audit" bind:selected />
	</div>
</div>

<Modal bind:selected />

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
