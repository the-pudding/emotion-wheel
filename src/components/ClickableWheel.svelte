<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";
	import { select, selectAll } from "d3";
	import { Howl } from "howler";
	import { soundOn } from "$stores/misc.js";

	export let imgSrc;
	export let slices;
	export let wheelId;
	export let selected = [];
	export let limit = 1000;

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	const sound = new Howl({ src: [`${base}/assets/wheel/select.wav`] });

	onMount(() => {
		selectAll(`#${wheelId} #slices path`).on("click", (e) => {
			let current = select(`#${wheelId} #slices path#${e.target.id}`)
				.node()
				.classList.contains("highlighted");

			if (selected.length < limit || current) {
				sound.play();

				select(`#${wheelId} #slices path#${e.target.id}`).classed(
					"highlighted",
					!current
				);
				if (!current) {
					selected = [...selected, e.target.id];
				} else {
					selected = selected.filter((d) => d !== e.target.id);
				}
			}
		});

		selected.forEach((id) => {
			select(`#${wheelId} #slices path#${id}`).classed("highlighted", true);
		});
	});
</script>

<div class="wheel">
	<img
		src={`${base}/${imgSrc}`}
		alt="watercolor illustrated emotion wheel by abby"
	/>

	{@html slices}
</div>

<style>
	.wheel {
		position: relative;
		max-width: 800px;
		margin: 0 auto;
	}
	img {
		width: 100%;
	}

	:global(.wheel svg) {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	:global(.wheel svg #slices path) {
		opacity: 0;
	}
	:global(.wheel svg #slices path.highlighted) {
		opacity: 0.4;
	}
</style>
