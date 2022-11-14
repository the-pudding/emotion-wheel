<script>
	import { words, colors, needs, bodyDrawing } from "$stores/misc.js";
	import determineFontColor from "$utils/determineFontColor.js";
	import { onMount } from "svelte";
	import { toPng } from "html-to-image";

	export let text;

	let summaryEl;

	const save = async () => {
		const img = await toPng(summaryEl, { backgroundColor: "white" });
		const link = document.createElement("a");
		link.download = "screenshot.png";
		link.href = img;
		link.click();
	};

	onMount(() => {
		let child = document
			.querySelector("div#body-summary")
			.appendChild($bodyDrawing);
		child.setAttribute("style", "height: 300px");
	});
</script>

<div class="container">
	<div class="text">
		{#each text as t}
			<p>{@html t}</p>
		{/each}
	</div>

	<div class="summary" bind:this={summaryEl}>
		<div class="section">
			<h2>I feel:</h2>
			<ul class="words">
				{#each $words as word, i}
					<li
						style:background-color={$colors[i]}
						style:color={determineFontColor($colors[i])}
						class="word"
					>
						{word}
					</li>
				{/each}
			</ul>
		</div>

		<div class="section" id="body-summary">
			<h2>I notice:</h2>
		</div>

		<div class="section">
			<h2>I need:</h2>
			<ul class="needs">
				{#each $needs as need}
					<li>{need}</li>
				{/each}
			</ul>
		</div>

		<button class="download" on:click={save}>download</button>
	</div>
</div>

<style>
	.container {
		position: absolute;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.text {
		width: 20%;
		margin-left: 10%;
	}

	.summary {
		position: relative;
		margin-left: 4em;
		border: 3px solid var(--color-fg);
		display: flex;
		justify-content: space-between;
		padding-bottom: 1em;
		background-color: var(--color-grey-balloon);
	}
	.section {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 1.3em;
	}
	h2 {
		text-decoration: underline;
	}
	.word {
		padding: 4px;
		text-align: center;
		border-radius: 6px;
		margin: 0.5em 0;
	}
	ul.words {
		list-style-type: none;
	}
	ul.needs {
		list-style-type: circle;
	}
	button.download {
		position: absolute;
		right: 0;
		bottom: 0;
	}
</style>
