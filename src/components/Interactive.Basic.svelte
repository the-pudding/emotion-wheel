<script>
	import Voronoi from "$components/Voronoi.svelte";
	import { basicFeeling, userId } from "$stores/misc.js";
	import { insert, getData } from "$utils/supabase.js";
	import _ from "lodash";

	export let options;

	let data;

	$: if ($basicFeeling) prepareData();

	const prepareData = async () => {
		const raw = await getData();

		let grouped = _.groupBy(
			raw
				.filter((d) => d.deeper_words && d.colors)
				.reduce((acc, current) => {
					const deeperWords = current.deeper_words.split("|");
					const colors = current.colors.split("|");

					const entries = deeperWords.map((d, i) => ({
						name: d,
						color: colors[i],
						basicWord: current.basic_word,
						frequency: 10
					}));

					if (acc.length) return [...acc, ...entries];
					return entries;
				}),
			"basicWord"
		);

		let result = [];
		_.forEach(grouped, (value, key) => {
			result.push({ name: key, children: value });
		});

		data = result;
	};

	$: console.log({ data });

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
	{@const selected = d === $basicFeeling}
	<button on:click={submit} id={d} class:selected>{d}</button>
{/each}
{#if $basicFeeling}
	<p>Here's how everyone is doing...</p>

	{#if data}
		<Voronoi data={data.find((d) => d.name === "good")} />
	{/if}
{/if}

<style>
	button {
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
