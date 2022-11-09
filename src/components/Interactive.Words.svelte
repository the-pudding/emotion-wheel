<script>
	import Viz2 from "$components/Viz2.svelte";
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import { basicFeeling, words, userId, soundOn } from "$stores/misc.js";
	import { update, getData } from "$utils/supabase.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";
	import slices from "$svg/grey-wheel-slices.svg";

	let data;
	let editing = true;
	const sound = new Howl({ src: ["assets/sound/after-word.wav"] });

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);
	$: if ($words.length) prepareData();

	const prepareData = async () => {
		const raw = await getData();
		const recent = _.orderBy(
			raw.filter((d) => d.deeper_words),
			"created_at",
			"desc"
		)
			.slice(0, 50)
			.map((d) => _.pick(d, ["id", "created_at", "deeper_words"]));
		const split = recent.reduce((acc, current) => {
			const words = current.deeper_words.split("|");
			const theRest = _.omit(current, ["deeper_words", "id"]);
			const entries = words.map((w, i) => ({
				id: `${current.id}-${i}`,
				deeper_word: w,
				...theRest
			}));

			return [...acc, ...entries];
		}, []);

		data = split;
	};

	const updateDb = async () => {
		await update({
			table: "emotions",
			column: "deeper_words",
			value: $words.join("|"),
			id: $userId
		});
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
			<p>Pick as many as you like!</p>

			<ClickableWheel
				{slices}
				imgSrc={`assets/img/grey_wheel.png`}
				wheelId="grey-wheel"
				bind:selected={$words}
			/>
			<button on:click={confirm}>Confirm</button>
		{:else}
			<p>Nice work!</p>
			<button on:click={edit}>Edit my words</button>
		{/if}
	</div>

	{#if data && !editing}
		<Viz2 {data} wordAccessor={"deeper_word"} groupBy={"deeper_word"} />
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

	.wheel {
		position: relative;
		max-width: 800px;
		margin: 0 auto;
	}
	img {
		width: 100%;
	}
	:global(svg#grey-wheel) {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	:global(#grey-wheel #slices path) {
		opacity: 0;
	}
	:global(#grey-wheel #slices path.highlighted) {
		opacity: 0.4;
	}
</style>
