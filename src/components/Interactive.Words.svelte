<script>
	import { basicFeeling, words, userId } from "$stores/misc.js";
	import { update } from "$utils/supabase.js";
	import { wheelSections } from "$utils/words.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";

	const sound = new Howl({ src: ["assets/sound/after-word.wav"] });

	const skip = ["busy", "addicted", "tainted", "hateful", "violent"];
	const options = _.shuffle(
		wheelSections
			.map((d) =>
				_.sampleSize(
					d.words
						.slice(1)
						.flat()
						.filter((w) => !skip.includes(w.toLowerCase())),
					2
				)
			)
			.flat()
			.map((d) => d.toLowerCase())
	);

	const select = async (e) => {
		sound.play();

		let word = e.target.id;

		if ($words.includes(word)) $words = $words.filter((d) => d !== word);
		else $words = [...$words, word];

		// try/catch
		await update({
			table: "emotions",
			column: "deeper_words",
			value: $words.join("|"),
			id: $userId
		});
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<p>Here, you try...</p>
<p>What do you mean by <strong>{$basicFeeling}</strong>?</p>
<div class="emotions">
	{#each options as word}
		{@const selected = $words.includes(word)}
		<p id={word} class:selected on:click={select}>{word}</p>
	{/each}
</div>

{#if $words.length}
	<p>Here's how everyone is doing...</p>
{/if}

<style>
	button.continue {
		display: block;
	}
	.emotions {
		z-index: 1;
	}
	.emotions p {
		margin: 0;
	}
	.emotions p:hover {
		cursor: pointer;
		font-size: 1.6em;
		text-decoration: underline;
	}
	.emotions p.selected {
		font-size: 1.6em;
		text-decoration: underline;
	}
</style>
