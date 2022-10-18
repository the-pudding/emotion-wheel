<script>
	import { basicFeeling, userId } from "$stores/misc.js";
	import { insert } from "$utils/supabase.js";

	export let options;

	const submit = async (e) => {
		const response = e.target.id;
		$basicFeeling = response;
		const data = [
			{
				basic_word: response
			}
		];
		// try/catch
		const result = await insert({ table: "emotions", data });

		$userId = result[0].id;
	};
</script>

<p>Hi, how are you doing?</p>
{#each options as d}
	<button on:click={submit} id={d}>{d}</button>
{/each}
{#if $basicFeeling}
	<p>Here's how everyone is doing...</p>
{/if}
