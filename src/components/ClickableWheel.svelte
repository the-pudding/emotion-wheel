<script>
	import { base } from "$app/paths";
	import { onMount, onDestroy } from "svelte";
	import { select, selectAll } from "d3";
	import { Howl } from "howler";
	import { soundOn } from "$stores/misc.js";

	export let imgSrc;
	export let slices;
	export let wheelId;
	export let selected = [];
	export let limit = 1000;
	export let soundId = "select";
	export let withColor = false;

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	const sound = new Howl({ src: [`${base}/assets/sound/${soundId}.wav`] });

	const onClick = (e) => {
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
				let newEntry;
				if (withColor)
					newEntry = { word: e.target.id, color: e.srcElement.parentNode.id };
				else newEntry = e.target.id;

				selected = [...selected, newEntry];
			} else {
				selected = selected.filter((d) => d !== e.target.id);
			}
		}
	};

	onMount(() => {
		let allSlices = selectAll(`#${wheelId} #slices path`);

		allSlices.attr("tabindex", "0");
		allSlices.on("keydown", (e) => {
			// space or enter
			if (e.keyCode === 13 || e.keyCode === 32) {
				onClick(e);
			}
		});

		allSlices.on("click", onClick);

		selected.forEach((id) => {
			select(`#${wheelId} #slices path#${id}`).classed("highlighted", true);
		});
	});

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="interactive-wheel">
	<img
		src={`${base}/${imgSrc}`}
		alt="watercolor illustrated emotion wheel by abby"
	/>

	{@html slices}
</div>

<style>
	.interactive-wheel {
		position: relative;
		max-width: 800px;
		margin: 0 auto;
	}
	img {
		width: 100%;
	}

	:global(.interactive-wheel svg) {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	:global(.interactive-wheel svg #slices path) {
		opacity: 0;
	}
	:global(.interactive-wheel svg #slices path):hover {
		cursor: pointer;
	}
	:global(.interactive-wheel svg #slices path.highlighted) {
		opacity: 0.4;
	}
</style>
