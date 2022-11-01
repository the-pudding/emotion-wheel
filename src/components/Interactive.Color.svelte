<script>
	import Viz from "$components/Viz.svelte";
	import { update, getData } from "$utils/supabase.js";
	import { words, colors, userId, worldBg } from "$stores/misc.js";
	import ColorPicker from "$components/ColorPicker.svelte";
	import { Howl } from "howler";
	import { onDestroy } from "svelte";
	import determineFontColor from "$utils/determineFontColor.js";
	import _ from "lodash";

	const sound = new Howl({ src: ["assets/sound/after-color.wav"] });
	const initialColor = "#b5bbbb";
	let color = initialColor;
	let i = 0;
	let editing = true;
	let data;

	$: currentWord = $words[i];
	$: color, onColorChange();
	$: textColor = determineFontColor($worldBg);
	$: if ($colors.length) prepareData();

	const prepareData = async () => {
		const raw = await getData();
		const recent = _.orderBy(
			raw.filter(
				(d) =>
					d.deeper_words &&
					d.colors &&
					d.colors.split("|").length === d.deeper_words.split("|").length
			),
			"created_at",
			"desc"
		).slice(0, 100);

		data = recent.map((d) =>
			_.pick(d, ["id", "created_at", "deeper_words", "colors"])
		);
	};

	const onColorChange = () => {
		if (color !== initialColor) $worldBg = color;
	};

	const initialize = () => {
		if ($colors[i]) {
			color = $colors[i];
		} else {
			color = initialColor;
		}
		$worldBg = initialColor;
	};

	const updateDb = async () => {
		await update({
			table: "emotions",
			column: "colors",
			value: $colors.join("|"),
			id: $userId
		});
	};

	const confirm = async () => {
		sound.play();
		$colors[i] = color;

		await updateDb();

		if (i + 1 < $words.length) i += 1;
		else {
			editing = false;
		}

		initialize();
	};

	const edit = () => {
		editing = true;
		i = 0;
		color = $colors[i];
		$worldBg = color;
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="container">
	<div class="words">
		{#if editing}
			<p class="text" style:color={textColor}>
				You're feeling <strong class="word">{currentWord}</strong> - what color is
				it?
			</p>
			<ColorPicker bind:color />

			<button on:click={confirm}>That's it</button>
		{:else}
			<p>Nice work!</p>
			<button on:click={edit}>Edit my colors</button>
		{/if}
	</div>

	{#if data && !editing}
		<Viz {data} wordAccessor={"deeper_words"} withColor={true} />
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
		display: block;
		z-index: 1;
		margin-top: 1em;
	}
	.word {
		font-size: 1.6em;
		margin: 0 3px;
	}
	.text {
		transition: color 500ms;
	}
</style>
