<script>
	import Card from "$components/Activities.Card.svelte";
	import Modal from "$components/Activities.Modal.svelte";
	import _ from "lodash";

	let currentActivity;
	let words = [];
	let bodyImage;

	const formatWord = (str) =>
		str === "somethings-wrong"
			? "something's wrong"
			: _.startCase(str).toLowerCase();

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

	<div class="results">
		<div class="wheel-results">
			<ul>
				{#each words as word}
					<li>{formatWord(word)}</li>
				{/each}
			</ul>
		</div>
		<div class="body-results">
			{#if bodyImage}
				<img src={bodyImage.src} />
			{/if}
		</div>
	</div>

	<Modal bind:currentActivity bind:words bind:bodyImage />
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
	.results {
		width: 100%;
		display: flex;
	}
	.results div {
		width: 33%;
	}
	.wheel-results {
	}
</style>
