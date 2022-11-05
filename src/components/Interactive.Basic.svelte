<script>
	import { basicFeeling, userId } from "$stores/misc.js";
	import { insert, getData } from "$utils/supabase.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";
	import Viz from "$components/Viz.svelte";
	import Viz2 from "$components/Viz2.svelte";

	export let options;

	const sound = new Howl({ src: ["assets/sound/after-basic.wav"] });
	let data;

	$: if ($basicFeeling) prepareData();

	const prepareData = async () => {
		const raw = await getData();

		const recent = _.orderBy(
			raw.filter((d) => d.basic_word !== ""),
			"created_at",
			"desc"
		).slice(0, 50);

		data = recent.map((d) => _.pick(d, ["id", "created_at", "basic_word"]));
	};

	const submit = async (e) => {
		sound.play();

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

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="container">
	<div class="words">
		<p>Hi, how are you doing?</p>
		{#each options as d}
			{@const selected = d === $basicFeeling}
			<button on:click={submit} id={d} class:selected>{d}</button>
		{/each}
		{#if $basicFeeling}
			<p>Here's how the last 50 people to visit this site have felt:</p>
		{/if}
	</div>

	{#if data}
		<Viz2 {data} wordAccessor={"basic_word"} groupBy={"basic_word"} />
		<!-- <Viz {data} wordAccessor={"basic_word"} /> -->
	{/if}
</div>

<style>
	.container {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100vh;
	}
	.words {
		width: 20%;
	}
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
