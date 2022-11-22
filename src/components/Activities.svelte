<script>
	import Card from "$components/Activities.Card.svelte";
	import Modal from "$components/Activities.Modal.svelte";
	import _ from "lodash";
	import { toPng } from "html-to-image";
	import { annotate } from "svelte-rough-notation";
	import variables from "$data/variables.json";
	import determineFontColor from "$utils/determineFontColor.js";
	import needsKey from "$utils/needsKey.js";

	let summaryEl;
	let currentActivity;
	let words = [];
	let needs = [];
	let bodyImage;

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
		link.download = "screenshot.png";
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
				<img src={bodyImage.src} />
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

	<Modal bind:currentActivity bind:words bind:bodyImage bind:needs />
</div>

<div tabindex="0" class="download" on:click={save}>download</div>

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
	.needs-results ul {
		list-style-type: circle;
	}
	li {
		width: fit-content;
	}
	.download {
		font-family: var(--sans);
		font-size: var(--14px);
		text-decoration: underline;
	}
	.download:hover {
		cursor: pointer;
		color: var(--color-gray-700);
	}
</style>
