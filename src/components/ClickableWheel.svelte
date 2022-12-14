<script>
	import { base } from "$app/paths";
	import { onMount, onDestroy } from "svelte";
	import { select, selectAll } from "d3";
	import { Howl } from "howler";
	import { soundOn, basicFeeling } from "$stores/misc.js";

	export let imgSrc;
	export let slices;
	export let wheelId;
	export let selected = [];
	export let limit = 1000;
	export let soundId = "select";
	export let withColor = false;
	export let nextSelectable;

	let numFocusableElements;
	let firstFocusableElement;
	let lastFocusableElement;

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	const sound = new Howl({
		src: [`${base}/assets/sound/${soundId}.wav`],
		volume: 0.3
	});

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

				if (selected[0] === $basicFeeling) selected = [newEntry];
				else selected = [...selected, newEntry];
			} else {
				selected = selected.filter((d) => d !== e.target.id);
			}
		}
	};

	const trapFocus = (e) => {
		const escapePressed = e.key === "Escape" || e.keyCode === 27;
		if (escapePressed) {
			if (nextSelectable) nextSelectable.focus();
			return;
		}

		const tabPressed = e.key === "Tab" || e.keyCode === 9;
		if (!tabPressed) return;

		if (e.shiftKey) {
			if (document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastFocusableElement) {
				firstFocusableElement.focus();
				e.preventDefault();
			}
		}
	};

	onMount(() => {
		let allSlices = selectAll(`#${wheelId} #slices path`);

		numFocusableElements = allSlices.nodes().length;
		firstFocusableElement = allSlices.nodes()[0];
		lastFocusableElement = allSlices.nodes()[numFocusableElements - 1];

		allSlices.attr("tabindex", "0");
		allSlices.on("keydown", (e) => {
			// space or enter
			if (e.keyCode === 13 || e.keyCode === 32) {
				onClick(e);
			}
		});
		allSlices.on("click", onClick);

		selected.forEach(({ word }) => {
			select(`#${wheelId} #slices path#${word}`).classed("highlighted", true);
		});
	});

	onDestroy(() => {
		sound.unload();
	});
</script>

<div
	class="interactive-wheel"
	class:activities={wheelId === "the-wheel"}
	on:keydown={trapFocus}
>
	<img
		srcset={`${imgSrc}-sm.png 500w, ${imgSrc}-lg.png 800w`}
		sizes={`(max-width: 600px) 800px, 1000px`}
		src={`${base}/${imgSrc}-lg.png`}
		alt="watercolor illustrated emotion wheel by abby"
	/>

	{@html slices}
</div>

<style>
	.interactive-wheel {
		position: relative;
		margin: 0 auto;
		height: 80%;
	}
	.activities {
		height: auto;
		max-height: 72%;
	}
	img {
		object-fit: contain;
		width: 100%;
		height: 100%;
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
