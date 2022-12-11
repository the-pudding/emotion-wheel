<script>
	import Card from "$components/Gallery.Card.svelte";
	import { zoomModalImage } from "$stores/misc.js";
	import mq from "$stores/mq.js";

	export let images;
</script>

<div class="container" class:faded={$zoomModalImage}>
	<div class="instruction">
		{$mq.desktop ? "Click" : "Tap"} to explore up close!
	</div>
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
	.instruction {
		position: absolute;
		left: 50%;
		top: -8%;
	}
</style>
