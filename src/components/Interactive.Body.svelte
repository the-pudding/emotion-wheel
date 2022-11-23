<script>
	import BodyDraw from "$components/BodyDraw.svelte";
	import determineFontColor from "$utils/determineFontColor.js";
	import { words, colors, bodyDrawing } from "$stores/misc.js";
	import _ from "lodash";
	import { annotate } from "svelte-rough-notation";
	import { toPng } from "html-to-image";
	import variables from "$data/variables.json";

	export let text;

	let screenshotEl;
	let i = Math.floor(Math.random() * $words.length);
	let word = $words[i];
	let color = $colors[i] ? $colors[i] : variables.color["grey-balloon"];
	const formatWord = (str) =>
		str === "somethings-wrong"
			? "something's wrong"
			: _.startCase(str).toLowerCase();

	const screenshot = async () => {
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

		<button class="confirm" on:click={screenshot}>All done</button>
	</div>
</div>

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
</style>
