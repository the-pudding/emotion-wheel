<script>
	import { words, colors, needs, bodyDrawing } from "$stores/misc.js";
	import determineFontColor from "$utils/determineFontColor.js";
	import { toPng } from "html-to-image";
	import _ from "lodash";
	import { annotate } from "svelte-rough-notation";

	const formatWord = (str) => _.startCase(str).toLowerCase();

	const needsKey = {
		belly: "to breathe into my belly",
		talk: "to talk to someone",
		breathing: "to take a deep breath",
		ground: "to ground in the present",
		sleep: "to rest or sleep",
		cry: "to cry",
		hug: "a hug or a snuggle",
		snack: "a snack",
		no: 'to say "no"',
		discharge: "to discharge energy",
		learn: "to learn more",
		make: "to make something",
		savor: "savor it",
		smile: "smile",
		celebrate: "celebrate",
		smile: "smile"
	};

	let summaryEl;

	const save = async () => {
		const img = await toPng(summaryEl, { backgroundColor: "white" });
		const link = document.createElement("a");
		link.download = "screenshot.png";
		link.href = img;
		link.click();
	};
</script>

<div class="summary">
	<div class="box" bind:this={summaryEl}>
		<div tabindex="0" class="download" on:click={save}>download</div>

		<div class="section">
			<h3>I feel:</h3>
			<ul class="words">
				{#each $words as word, i}
					<li
						use:annotate={{
							type: "highlight",
							animate: false,
							visible: true,
							color: $colors[i]
						}}
						style:color={determineFontColor($colors[i])}
						class="word"
					>
						{formatWord(word)}
					</li>
				{/each}
			</ul>
		</div>

		<div class="section" id="body-summary">
			<h3>I notice:</h3>
			<img class="body" src={$bodyDrawing.src} />
		</div>

		<div class="section">
			<h3>I need:</h3>

			<ul class="needs">
				{#each $needs.filter((d) => d !== "") as need}
					<li>{needsKey[need]}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.summary {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(0, -50%);
		border-radius: 6px;
	}
	.box {
		max-width: 700px;
		border-radius: 8px;
		background: white;
		padding: 1em 1em 0 1em;
		box-shadow: rgb(50 50 93 / 25%) 0px 6px 12px -2px,
			rgb(0 0 0 / 30%) 0px 3px 7px -3px;
		display: flex;
		justify-content: space-between;
		position: relative;
	}
	img.body {
		max-height: 68%;
		margin: 0 -5em;
	}
	.section {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 1.3em;
	}
	h3 {
		margin-top: 0;
		text-align: center;
	}
	ul.words {
		list-style-type: none;
	}
	ul.needs {
		list-style-type: circle;
		font-size: var(--18px);
	}
	li.word {
		width: fit-content;
	}
	.download {
		position: absolute;
		bottom: -2em;
		right: 0;
		font-family: var(--sans);
		font-size: var(--14px);
		text-decoration: underline;
	}
	.download:hover {
		cursor: pointer;
		color: var(--color-gray-700);
	}

	@media (max-height: 600px) {
		h3 {
			font-size: var(--20px);
		}
		.section {
			margin: 0 1em;
		}
	}
</style>
