<script>
	import { words, colors, needs, bodyDrawing } from "$stores/misc.js";
	import determineFontColor from "$utils/determineFontColor.js";
	import { toPng } from "html-to-image";
	import _ from "lodash";
	import Button from "$components/Button.svelte";
	import { timeFormat } from "d3";
	import variables from "$data/variables.json";
	import { annotate } from "svelte-rough-notation";
	import needsKey from "$utils/needsKey";
	import mq from "$stores/mq.js";

	const formatWord = (str) => _.startCase(str).toLowerCase();
	const formatTime = timeFormat("%m-%d-%Y");

	$: showBody = $mq.desktop && !$mq.safari;

	let summaryEl;

	const save = async () => {
		const img = await toPng(summaryEl, { backgroundColor: "white" });
		const link = document.createElement("a");
		link.download = `${formatTime(new Date())}.png`;
		link.href = img;
		link.click();
	};
</script>

<div
	class="summary"
	use:annotate={{
		type: "box",
		animate: false,
		visible: true,
		color: "black",
		padding: 0
	}}
>
	<div class="box" bind:this={summaryEl}>
		<!-- <Button
			onClick={save}
			right={0}
			bottom={"-3em"}
			small={true}
			transform={false}>download</Button
		> -->

		<div class="section">
			<h3>I feel:</h3>
			<ul class="words">
				{#each $words as word, i}
					<li
						use:annotate={{
							type: "highlight",
							animate: false,
							visible: true,
							color: $colors[i] ? $colors[i] : variables.color["grey-balloon"]
						}}
						style:color={determineFontColor($colors[i])}
						class="word"
					>
						{formatWord(word)}
					</li>
				{/each}
			</ul>
		</div>

		{#if showBody}
			<div class="section" id="body-summary">
				<h3>I notice:</h3>
				<img class="body" src={$bodyDrawing.src} alt="your body scan drawing" />
			</div>
		{/if}

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
		max-width: 60%;
	}
	.box {
		width: 100%;
		border-radius: 8px;
		background: white;
		padding: 1em;
		box-shadow: rgb(50 50 93 / 25%) 0px 6px 12px -2px,
			rgb(0 0 0 / 30%) 0px 3px 7px -3px;
		display: flex;
		justify-content: space-between;
		position: relative;
	}
	img.body {
		min-width: 200px;
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
		flex-shrink: 0;
	}
	ul.needs {
		list-style-type: circle;
		font-size: var(--18px);
		flex-shrink: 0;
	}
	li.word {
		width: fit-content;
	}

	@media (max-height: 600px) {
		h3 {
			font-size: var(--16px);
		}
		.section {
			margin: 0 1em;
		}
		img.body {
			min-width: 80px;
		}
	}
</style>
