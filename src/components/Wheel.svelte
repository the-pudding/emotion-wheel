<script>
	import { base } from "$app/paths";
	import slices from "$svg/slices.svg";
	import { onMount, onDestroy } from "svelte";
	import { select, selectAll } from "d3";
	import { soundOn } from "$stores/misc.js";
	import { Howl } from "howler";
	import Icon from "$components/helpers/Icon.svelte";
	import ClickableWheel from "$components/ClickableWheel.svelte";

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);
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
	<a class="download" download="" alt="download your emotion wheel"
		><Icon name="download" /></a
	>

	<ClickableWheel
		{slices}
		imgSrc={`../assets/activities/wheel.png`}
		wheelId="the-wheel"
	/>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 1em;
	}
	h1 {
		text-align: center;
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
</style>
