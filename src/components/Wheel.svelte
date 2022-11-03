<script>
	import slices from "$svg/slices.svg";
	import { onMount, onDestroy } from "svelte";
	import { select, selectAll } from "d3";
	import { Howl } from "howler";

	const sound = new Howl({ src: ["../assets/wheel/select.wav"] });

	onMount(() => {
		selectAll("#the-wheel #slices path").on("click", (e) => {
			sound.play();

			let current = select(`#the-wheel #slices path#${e.target.id}`)
				.node()
				.classList.contains("highlighted");
			select(`#the-wheel #slices path#${e.target.id}`).classed(
				"highlighted",
				!current
			);
		});
	});

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="container">
	<img src="../assets/wheel/wheel.png" />

	{@html slices}
</div>

<style>
	:global(body) {
		background: rgb(2, 11, 41);
	}
	.container {
		position: relative;
		max-width: 800px;
		margin: 0 auto;
	}
	img {
		width: 100%;
	}
	:global(svg#the-wheel) {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	:global(#the-wheel #slices path) {
		opacity: 0;
	}
	:global(#the-wheel #slices path.highlighted) {
		opacity: 0.4;
	}
</style>
