<script>
	import Card from "$components/Activities.Card.svelte";
	import Modal from "$components/Activities.Modal.svelte";
	import _ from "lodash";
	import { toPng } from "html-to-image";
	import { annotate } from "svelte-rough-notation";
	import variables from "$data/variables.json";
	import determineFontColor from "$utils/determineFontColor.js";
	import needsKey from "$utils/needsKey.js";
	import { timeFormat } from "d3";

	let summaryEl;
	let currentActivity;
	let words = [];
	let needs = [];
	let bodyImage;

	const formatTime = timeFormat("%m-%d-%Y");
	const formatWord = (str) =>
		str === "somethings-wrong"
			? "something's wrong"
			: _.startCase(str).toLowerCase();

	const cards = [
		{ imageSrc: "wheel", title: "Emotion Wheel" },
		{ imageSrc: "body", title: "Body mapping" },
		{ imageSrc: "needs", title: "Needs checklist" }
	];

	const save = async () => {
		const img = await toPng(summaryEl, { backgroundColor: "white" });
		const link = document.createElement("a");
		link.download = `${formatTime(new Date())}.png`;
		link.href = img;
		link.click();
	};
</script>

<div class="container">
	<div class="top">
		<h1>Activities</h1>
		<a href={`../`} class="to-story">Go back to story</a>
	</div>

	<div class="cards">
		{#each cards as { imageSrc, title }}
			<Card {imageSrc} {title} bind:currentActivity />
		{/each}
	</div>

	<div class="results" bind:this={summaryEl}>
		<div class="wheel-results">
			<ul>
				{#each words as { word, color }}
					<li
						use:annotate={{
							type: "highlight",
							animate: false,
							visible: true,
							color: variables.color[color]
						}}
						style:color={determineFontColor(variables.color[color])}
					>
						{formatWord(word)}
					</li>
				{/each}
			</ul>
		</div>
		<div class="body-results">
			{#if bodyImage}
				<img src={bodyImage.src} alt="your body scan drawing" />
			{/if}
		</div>
		<div class="needs-results">
			<ul>
				{#each needs as need}
					<li>{needsKey[need]}</li>
				{/each}
			</ul>
		</div>
	</div>

	<div tabindex="0" class="download" class:visible={bodyImage} on:click={save}>
		download
	</div>

	<Modal bind:currentActivity bind:words bind:bodyImage bind:needs />
</div>

<style>
	:global(body) {
		background: white;
	}
	a.to-story {
		font-family: var(--sans);
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 2em;
		margin-bottom: 4em;
		background: white;
	}
	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		margin-bottom: 2em;
	}
	.top h1 {
		margin-bottom: 0;
	}
	.cards {
		display: flex;
		width: 100%;
		margin-bottom: 3em;
	}
	.results {
		width: 100%;
		display: flex;
	}
	.results div {
		width: 33%;
	}
	.wheel-results {
		font-size: var(--32px);
		padding-top: 2em;
	}
	.wheel-results ul {
		list-style-type: none;
	}
	.body-results {
		display: flex;
		justify-content: center;
	}
	.needs-results ul {
		font-size: var(--32px);
		list-style-type: circle;
	}
	li {
		width: fit-content;
	}
	.download {
		font-family: var(--sans);
		font-size: var(--18px);
		text-decoration: underline;
		visibility: hidden;
		margin-top: 1em;
	}
	.download.visible {
		visibility: visible;
	}
	.download:hover {
		cursor: pointer;
		color: var(--color-gray-700);
	}
</style>
