<script>
	import { basicFeeling, words, colors, needs, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";
	import { annotate } from "svelte-rough-notation";
	import variables from "$data/variables.json";
	import Button from "$components/Button.svelte";
	import mq from "$stores/mq.js";

	export let text;

	const options = ["okay", "good", "not great", "busy"];

	const processText = (str) => {
		if ($mq.desktop) return str;
		else return str.replace("click", "tap").replace("Click", "Tap");
	};

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);
	$: disabled = $basicFeeling;

	const sound = new Howl({
		src: ["assets/sound/select.wav"],
		volume: 0.3
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
		sound.play();
		$basicFeeling = "okay";
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="basic">
	{#each text as t}
		<p>{@html processText(t)}</p>
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

<Button top={"50%"} left={"76%"} transform={true} {disabled} onClick={skip}
	>skip</Button
>

<style>
	.basic {
		position: absolute;
		top: 40%;
		left: 20%;
		transform: translate(0, -50%);
	}
	.basic p:nth-child(2) {
		font-size: 16px;
		margin: 0.5em 0;
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
	button.option:hover {
		color: var(--color-gray-600);
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
