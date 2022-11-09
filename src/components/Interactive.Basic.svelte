<script>
	import { basicFeeling, userId, soundOn } from "$stores/misc.js";
	import { insert, getData, update } from "$utils/supabase.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";
	import Viz from "$components/Viz.svelte";
	import Viz2 from "$components/Viz2.svelte";

	let data;
	const options = ["ok", "good", "busy"];

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	const sound = new Howl({
		src: ["assets/sound/after-basic.wav"]
	});

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

		if ($userId === undefined) {
			const result = await insert({
				table: "emotions",
				data: { basic_word: response }
			});
			$userId = result[0].id;
			prepareData();
		} else {
			await update({
				table: "emotions",
				column: "basic_word",
				value: $basicFeeling,
				id: $userId
			});
		}
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
		height: 100%;
	}
	.words {
		width: 20%;
		margin-left: 10%;
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
