<script>
	import { base } from "$app/paths";
	import { Howl } from "howler";
	import { soundOn } from "$stores/misc.js";
	import { onMount } from "svelte";
	import { selectAll, select } from "d3";

	export let imgSrc;
	export let checks;
	export let wheelId;
	export let selected;
	export let soundId = "select";
	export let limit = 1000;

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);
	$: if (selected.length === 0) clear();

	const sound = new Howl({ src: [`${base}/assets/sound/${soundId}.wav`] });

	const clear = () => {
		selectAll(`#${wheelId} path`).classed("highlighted", false);
	};

	const onClick = (e) => {
		let current = select(`#${wheelId} path#${e.target.id}-box`)
			.node()
			.classList.contains("highlighted");

		if (selected.length < limit || current) {
			sound.play();

			select(`#${wheelId} path#${e.target.id}-box`).classed(
				"highlighted",
				!current
			);
			if (!current) {
				selected = [...selected, e.target.id];
			} else {
				selected = selected.filter((d) => d !== e.target.id);
			}
		}
	};

	onMount(() => {
		let allBoxes = selectAll(`#${wheelId} rect`);

		allBoxes.attr("tabindex", "0");
		allBoxes.on("keydown", (e) => {
			// space or enter
			if (e.keyCode === 13 || e.keyCode === 32) {
				onClick(e);
			}
		});

		allBoxes.on("click", onClick);

		selected.forEach((id) => {
			select(`#${wheelId} path#${id}-box`).classed("highlighted", true);
		});
	});
</script>

<div
	class="interactive-needs-checklist"
	class:activities={wheelId === "needs-activities"}
>
	{#if imgSrc} <img src={`${base}/${imgSrc}`} alt="needs checklist" /> {/if}
	{@html checks}
</div>

<style>
	.interactive-needs-checklist {
		width: 100%;
		height: 100%;
		max-width: none;
		position: relative;
	}
	.interactive-needs-checklist.activities {
		max-width: 900px;
	}
	img {
		/* position: absolute;
		top: 0;
		z-index: -1;
		width: 100%; */
	}
	:global(.interactive-needs-checklist svg) {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	:global(.interactive-needs-checklist svg rect):hover {
		cursor: pointer;
	}
	:global(.interactive-needs-checklist svg rect) {
		opacity: 0;
	}
	:global(.interactive-needs-checklist svg path) {
		opacity: 0;
	}
	:global(.interactive-needs-checklist svg path.highlighted) {
		opacity: 0.9;
	}
</style>
