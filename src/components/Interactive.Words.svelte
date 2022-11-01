<script>
	import Viz from "$components/Viz.svelte";
	import { basicFeeling, words, userId } from "$stores/misc.js";
	import { update, getData } from "$utils/supabase.js";
	import { fromBasic } from "$utils/words.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";

	let data;
	let editing = true;
	const sound = new Howl({ src: ["assets/sound/after-word.wav"] });

	$: options = $basicFeeling
		? _.shuffle(fromBasic[$basicFeeling].map((d) => d.toLowerCase()))
		: [];

	$: if ($words.length) prepareData();

	const prepareData = async () => {
		const raw = await getData();
		const recent = _.orderBy(
			raw.filter((d) => d.deeper_words),
			"created_at",
			"desc"
		).slice(0, 100);

		data = recent.map((d) => _.pick(d, ["id", "created_at", "deeper_words"]));
	};

	const updateDb = async () => {
		await update({
			table: "emotions",
			column: "deeper_words",
			value: $words.join("|"),
			id: $userId
		});
	};

	const select = async (e) => {
		sound.play();

		let word = e.target.id;

		if ($words.includes(word)) $words = $words.filter((d) => d !== word);
		else $words = [...$words, word];
	};

	const confirm = async () => {
		await updateDb();
		editing = false;
	};

	const edit = () => {
		editing = true;
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="container">
	<div class="words">
		{#if editing}
			<p>Here, you try...</p>
			<p>What do you mean by <strong>{$basicFeeling}</strong>?</p>
			<div class="emotions">
				{#each options as word}
					{@const selected = $words.includes(word)}
					<p id={word} class:selected on:click={select}>{word}</p>
				{/each}
			</div>
			<button on:click={confirm}>Confirm</button>
		{:else}
			<p>Nice work!</p>
			<button on:click={edit}>Edit my words</button>
		{/if}
	</div>

	{#if data && !editing}
		<Viz {data} wordAccessor={"deeper_words"} />
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
