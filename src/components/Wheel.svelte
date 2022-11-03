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
	<h1>Hi, how are you feeling?</h1>
	<div class="wheel">
		<img
			src="../assets/wheel/wheel.png"
			alt="watercolor illustrated emotion wheel by abby"
		/>

		{@html slices}
	</div>
</div>

<style>
	:global(body) {
		background: rgb(2, 11, 41);
		color: white;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h1 {
		text-align: center;
	}
	.wheel {
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
