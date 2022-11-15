<script>
	import { needs } from "$stores/misc.js";
	import _ from "lodash";
	import { base } from "$app/paths";
	import needsChecks from "$svg/needs-checks.svg";
	import { onMount } from "svelte";
	import { select, selectAll } from "d3";
	import { Howl } from "howler";
	import { soundOn } from "$stores/misc.js";

	export let text;

	$: disabled = $needs.length > 0;
	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	const limit = 5;
	const sound = new Howl({ src: [`${base}/assets/activities/select.wav`] });

	const skip = () => {
		$needs = [""];
	};

	const onClick = (e) => {
		let current = select(`#needs-checks path#${e.target.id}`)
			.node()
			.classList.contains("highlighted");

		if ($needs.length < limit || current) {
			sound.play();

			select(`#needs-checks path#${e.target.id}`).classed(
				"highlighted",
				!current
			);
			if (!current) {
				$needs = [...$needs, e.target.id];
			} else {
				$needs = $needs.filter((d) => d !== e.target.id);
			}
		}
	};

	onMount(() => {
		let allBoxes = selectAll(`#needs-checks path`);

		allBoxes.attr("tabindex", "0");
		allBoxes.on("keydown", (e) => {
			// space or enter
			if (e.keyCode === 13 || e.keyCode === 32) {
				onClick(e);
			}
		});

		allBoxes.on("click", onClick);

		$needs.forEach((id) => {
			select(`#needs-checks path#${id}`).classed("highlighted", true);
		});
	});
</script>

{@html needsChecks}

<div class="words">
	{#each text as t}
		<p>{@html t}</p>
	{/each}

	<button class="skip" on:click={skip} {disabled}>skip</button>
</div>

<style>
	:global(div#survey-needs svg#needs-checks) {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	:global(#needs-checks path) {
		opacity: 0;
	}
	:global(#needs-checks path.highlighted) {
		opacity: 0.9;
	}

	.words {
		position: absolute;
		left: 1em;
	}
	.options {
		margin-bottom: 1em;
	}
	button.option {
		background: none;
		font-size: 1.6em;
		padding: 0;
		margin: 0 20px;
	}
	button:first-of-type {
		margin-left: 0;
	}
	button:hover,
	button.selected {
		text-decoration: underline;
	}
</style>
