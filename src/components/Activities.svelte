<script>
	import Card from "$components/Activities.Card.svelte";
	import Modal from "$components/Activities.Modal.svelte";

	let currentActivity;

	const cards = [
		{ imageSrc: "wheel", title: "Emotion Wheel" },
		{ imageSrc: "body", title: "Body mapping" },
		{ imageSrc: "needs", title: "Needs checklist" }
	];
</script>

<div class="container">
	<div class="top">
		<h1>Activities</h1>
		<a href={`../`}>Go back to story</a>
	</div>

	<div class="cards">
		{#each cards as { imageSrc, title }}
			<Card {imageSrc} {title} bind:currentActivity />
		{/each}
	</div>

	<Modal bind:currentActivity />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100vh;
		padding: 2em;
		background: white;
	}
	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		margin-bottom: 2em;
	}
	.top h1 {
		margin-bottom: 0;
	}
	.cards {
		display: flex;
		width: 100%;
	}
	.section {
		flex-basis: 33%;
		height: 500px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	img {
		max-height: 100%;
	}
</style>
