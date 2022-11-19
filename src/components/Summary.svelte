<script>
	import { words, colors, needs, bodyDrawing } from "$stores/misc.js";
	import determineFontColor from "$utils/determineFontColor.js";
	import { onMount } from "svelte";
	import { toPng } from "html-to-image";
	import _ from "lodash";

	export let text;

	const formatWord = (str) => _.startCase(str).toLowerCase();

	const needsKey = {
		"to-breathe-into-my-belly": "to breathe into my belly",
		"to-talk-to-someone": "to talk to someone",
		"to-take-a-deep-breath": "to take a deep breath",
		"to-ground-in-the-present": "to ground in the present",
		"to-rest-or-sleep": "to rest or sleep",
		"to-cry": "to cry",
		"a-hug-or-a-snuggle": "a hug or a snuggle",
		"a-snack": "a snack",
		"to-say-no": 'to say "no"',
		"to-discharge-energy": "to discharge energy",
		"to-learn-more": "to learn more",
		"to-make-something": "to make something",
		"savor-it": "savor it",
		"share-it": "share it",
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

	onMount(() => {
		let child = document
			.querySelector("div#body-summary")
			.appendChild($bodyDrawing);

		child.style["max-height"] = "68%";
		child.style.margin = "0 -5em";
		// child.style("max-height", "68%");
		// child.style("margin", "0 -5em");
	});
</script>

<div class="summary">
	<div class="box" bind:this={summaryEl}>
		<div class="section">
			<h3>I feel:</h3>
			<ul class="words">
				{#each $words as word, i}
					<li
						style:background-color={$colors[i]}
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
		</div>

		<div class="section">
			<h3>I need:</h3>

			<ul class="needs">
				{#each $needs.filter((d) => d !== "") as need}
					<li>{needsKey[need]}</li>
				{/each}
			</ul>
		</div>

		<button class="download" on:click={save}>download</button>
	</div>
</div>

<style>
	.summary {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(0, -50%);
	}
	.box {
		max-width: 700px;
		border: 3px solid var(--color-fg);
		display: flex;
		justify-content: space-between;
		position: relative;
		background-color: var(--color-grey-balloon);
	}
	.section {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 1.3em;
	}
	h3 {
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

	@media (max-height: 600px) {
		h3 {
			font-size: var(--20px);
		}
		.section {
			margin: 0 1em;
		}
	}
</style>
