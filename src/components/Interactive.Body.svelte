<script>
	import { base } from "$app/paths";
	import BodyDraw from "$components/BodyDraw.svelte";
	import Button from "$components/Button.svelte";
	import Modal from "$components/Modal.svelte";
	import determineFontColor from "$utils/determineFontColor.js";
	import { words, colors, bodyDrawing, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { Howl } from "howler";
	import { annotate } from "svelte-rough-notation";
	import { toPng } from "html-to-image";
	import variables from "$data/variables.json";
	import { onDestroy } from "svelte";
	import mq from "$stores/mq.js";

	export let text;

	let screenshotEl;
	let i = Math.floor(Math.random() * $words.length);
	const sound = new Howl({
		src: [`${base}/assets/sound/select.wav`],
		volume: 0.3
	});
	let showModal = false;

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);
	$: word = $words[i];
	$: color = $colors[i] ? $colors[i] : variables.color["grey-balloon"];

	const formatWord = (str) =>
		str === "somethings-wrong"
			? "something's wrong"
			: _.startCase(str).toLowerCase();

	const screenshot = async () => {
		if (showModal) showModal = false;

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

	const openModal = () => {
		showModal = true;
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="body">
	<div class="words">
		{#each text as t}
			<p>{@html t}</p>
		{/each}
	</div>

	{#if $mq.sm}
		<Button onClick={openModal} marginLeft={"2em"} pulse={!$bodyDrawing}
			>Draw</Button
		>
		<Modal bind:visible={showModal} big={true} hasClose={false}>
			<div class="interactive modal">
				<div class="description">
					<div style={`text-align: center`}>
						{$mq.desktop ? "Click" : "Tap"} a word to use that color
					</div>
					<div class="other-words">
						{#each $words as w, i}
							{@const bg = $colors[i]
								? $colors[i]
								: variables.color["grey-balloon"]}
							{@const textColor = determineFontColor(bg)}
							<button
								on:click={newWord}
								class="other-word"
								id={`body-interactive-${w}`}
								use:annotate={{
									type: "highlight",
									animate: false,
									visible: true,
									color: bg
								}}
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
					</div>
				</div>

				<BodyDraw {color} bind:screenshotEl />
				<Button
					onClick={screenshot}
					bottom={"1em"}
					right={"1em"}
					pulse={showModal}>Done</Button
				>
			</div>
		</Modal>
	{:else}
		<div class="interactive">
			<div class="other-words">
				{#each $words as w, i}
					{@const bg = $colors[i]
						? $colors[i]
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
			</div>
			<div style={`font-size: var(--16px)`}>
				{$mq.desktop ? "Click" : "Tap"} a word to use that color
			</div>
			<BodyDraw {color} bind:screenshotEl />
		</div>
	{/if}
</div>

{#if !$mq.sm}
	<Button
		onClick={screenshot}
		top={"53%"}
		left={"75%"}
		transform={true}
		pulse={!$bodyDrawing}>Done</Button
	>
{/if}

<style>
	.body {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 70%;
		top: 40%;
	}

	.words {
		margin-right: 3em;
	}
	.interactive {
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 100%;
	}
	.interactive.modal {
		padding: 0 4em;
		justify-content: center;
		flex-direction: row;
	}
	.description {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.word {
		font-weight: bold;
	}
	.modal .other-words {
		flex-direction: column;
		align-items: center;
		margin-top: 1em;
	}

	span.main-word {
		font-size: 1.6em;
		font-weight: bold;
		pointer-events: none;
	}
	.other-words {
		display: flex;
		flex-wrap: wrap;
		font-size: 1.4em;
	}
	.other-word {
		background: none;
		position: relative;
		transition: transform 500ms;
	}
	.other-word span {
		pointer-events: none;
	}
	.other-word:hover {
		transform: scale(1.15);
	}

	@media (max-height: 600px) {
		.words {
			margin-right: 0;
		}
	}
</style>
