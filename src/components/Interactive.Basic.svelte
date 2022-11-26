<script>
	import { basicFeeling, words, colors, needs, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";
	import { annotate } from "svelte-rough-notation";
	import variables from "$data/variables.json";

	export let text;

	const options = ["okay", "good", "not great", "busy"];

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);
	$: disabled = $basicFeeling;

	const sound = new Howl({
		src: ["assets/sound/magic.wav"]
	});

	const select = async (e) => {
		sound.play();
		const response = e.target.id;
		$basicFeeling = response;
		$words = [];
		$colors = [];
		$needs = [];
	};

	const skip = () => {
		$basicFeeling = "okay";
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="basic">
	{#each text as t}
		<p>{@html t}</p>
	{/each}
	<div class="options">
		{#each options as d}
			{@const selected = d === $basicFeeling}
			<button on:click={select} id={d} class="option">
				<span
					use:annotate={{
						type: "highlight",
						animate: true,
						visible: selected,
						color: variables.color["grey-balloon"]
					}}>{d}</span
				>
			</button>
		{/each}
	</div>
</div>

<!-- left: min(95vw, 75.5%), top some % -->
<button class="skip" on:click={skip} {disabled}>skip</button>

<style>
	.basic {
		position: absolute;
		top: 40%;
		left: 30%;
		transform: translate(0, -50%);
	}
	.options {
		display: grid;
		grid-template-columns: auto auto;
		column-gap: 3em;
		row-gap: 1em;
		margin: 1em 0;
	}
	button.option {
		background: none;
		font-size: 1.6em;
		padding: 0;
		text-align: left;
	}
	button:hover {
		color: var(--color-gray-700);
	}
	button.skip {
		position: absolute;
		top: 56%;
		left: 76%;
		transform: translate(-50%, -50%);
	}

	span {
		pointer-events: none;
	}

	@media (max-height: 600px) {
		.basic {
			max-width: 400px;
		}
	}
</style>
