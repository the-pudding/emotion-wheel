<script>
	import { base } from "$app/paths";
	import slices from "$svg/slices.svg";
	import { onMount, onDestroy } from "svelte";
	import { select, selectAll } from "d3";
	import { Howl } from "howler";
	import Icon from "$components/helpers/Icon.svelte";

	const sound = new Howl({ src: [`${base}/assets/wheel/select.wav`] });

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
	<a href={`../`}>Back to the story</a>
	<h1>Hi, how are you feeling?</h1>
	<div class="wheel">
		<img
			src={`${base}/assets/wheel/wheel.png`}
			alt="watercolor illustrated emotion wheel by abby"
		/>

		{@html slices}

		<a class="download" download="" alt="download your emotion wheel"
			><Icon name="download" /></a
		>
	</div>
</div>

<style>
	:global(body),
	a {
		background: rgb(2, 11, 41);
		color: white;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 1em;
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
	a.download {
		background: lightgrey;
		border-radius: 0;
		position: absolute;
		top: 0;
		right: 0;
		padding: 0.2em 0.3em 0 0.3em;
	}
	a.download:hover {
		cursor: pointer;
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
