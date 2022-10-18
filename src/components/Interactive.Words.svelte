<script>
	import { basicFeeling, words, userId } from "$stores/misc.js";
	import { update } from "$utils/supabase.js";

	let selectedWords = [];
	const options = [
		"calm",
		"creative",
		"frustrated",
		"guilty",
		"nervous",
		"tired",
		"overwhelmed",
		"lonely",
		"grateful",
		"pissed off",
		"curious",
		"self-conscious"
	];

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
