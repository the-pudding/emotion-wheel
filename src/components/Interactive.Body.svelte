<script>
	import { base } from "$app/paths";
	import BodyDraw from "$components/BodyDraw.svelte";
	import determineFontColor from "$utils/determineFontColor.js";
	import { words, colors, bodyDrawing, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { annotate } from "svelte-rough-notation";
	import { toPng } from "html-to-image";
	import variables from "$data/variables.json";
	import { onDestroy } from "svelte";

	export let text;

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	let screenshotEl;
	let i = Math.floor(Math.random() * $words.length);
	let word = $words[i];
	let color = $colors[i] ? $colors[i] : variables.color["grey-balloon"];
	const sound = new Howl({ src: [`${base}/assets/sound/select.wav`] });

	const formatWord = (str) =>
		str === "somethings-wrong"
			? "something's wrong"
			: _.startCase(str).toLowerCase();

	const screenshot = async () => {
		console.log("screenshot");
		sound.play();
		let png = await toPng(screenshotEl);
		let img = new Image();
		img.src = png;
		$bodyDrawing = img;
	};

	const newWord = (e) => {
		const w = e.target.id.replace("body-interactive-", "");
		word = w;
		let i = $words.findIndex((d) => d === w);
		color = $colors[i] ? $colors[i] : variables.color["grey-balloon"];
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="body">
	<div class="words">
		<p>
			How does <span
				class="main-word"
				use:annotate={{
					type: "highlight",
					animate: false,
					visible: true,
					color
				}}
				style:color={determineFontColor(color)}>{formatWord(word)}</span
			> show up in your body?
		</p>
		{#each text as t, i}
			<p>{@html t}</p>
		{/each}

		{#if $words.length > 1}
			<span>Use other colors:</span>
			{#each $words.filter((d) => d !== word) as w, i}
				{@const bg = $colors.filter((d) => d !== color)[i]
					? $colors.filter((d) => d !== color)[i]
					: variables.color["grey-balloon"]}
				{@const textColor = determineFontColor(bg)}
				<button
					on:click={newWord}
					class="other-word"
					id={`body-interactive-${w}`}
				>
					<span
						use:annotate={{
							type: "highlight",
							animate: false,
							visible: true,
							color: bg
						}}
						style:color={textColor}>{formatWord(w)}</span
					>
				</button>
			{/each}
		{/if}
	</div>

	<div class="interactive">
		<BodyDraw {color} bind:screenshotEl />
	</div>
</div>
<button class="confirm" on:click={screenshot}>Done</button>

<style>
	.body {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 70%;
		top: 40%;
		transform: translate(0, -50%);
	}
	button.confirm {
		position: absolute;
		top: 53%;
		left: 75%;
		transform: translate(-50%, -50%);
	}
	.words {
		margin-right: 3em;
	}
	.interactive {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.word {
		font-weight: bold;
	}
	button.skip {
		margin-top: 1em;
	}
	span.main-word {
		font-size: 1.6em;
		font-weight: bold;
		pointer-events: none;
	}
	.other-word {
		background: none;
		position: relative;
	}
	.other-word span {
		pointer-events: none;
	}

	@media (max-height: 600px) {
		.words {
			margin-right: 0;
		}
	}
</style>
