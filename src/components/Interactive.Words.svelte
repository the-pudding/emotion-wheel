<script>
	import { basicFeeling, words, userId } from "$stores/misc.js";
	import { update } from "$utils/supabase.js";
	import { wheelSections } from "$utils/words.js";
	import _ from "lodash";

	let selectedWords = [];

	const options = wheelSections
		.map((d) => _.sampleSize(d.words.slice(1).flat(), 2))
		.flat()
		.map((d) => d.toLowerCase());
	$: console.log({ options });

	const submit = async () => {
		$words = selectedWords;
		// try/catch
		await update({
			table: "emotions",
			column: "deeper_words",
			value: selectedWords.join("|"),
			id: $userId
		});
	};
</script>

<p>Here, you try...</p>
<p>What do you mean by <strong>{$basicFeeling}</strong>?</p>
{#each options as word}
	<label>
		<input
			type="checkbox"
			bind:group={selectedWords}
			name="words"
			value={word}
		/>
		{word}
	</label>
{/each}
<button class="continue" on:click={submit}>Confirm</button>

{#if $words.length}
	<p>Here's how everyone is doing...</p>
{/if}

<style>
	input {
		appearance: auto;
	}
	button.continue {
		display: block;
	}
</style>
