<script>
	import { showPlain } from "$stores/misc.js";
	import copy from "$data/copy.json";
	import Footer from "$components/FooterStandard.svelte";

	export let visible;

	const exclude = ["gallery-intro", "let-go"];
	const steps = copy.steps.filter((d) => d.text && !exclude.includes(d.id));

	const toStory = () => {
		$showPlain = false;
	};

	console.log(steps);
</script>

<div class="plain" class:visible>
	<div class="title-row">
		<h1>{@html copy.title}</h1>
		<div class="subtitle">All-text version</div>
		<button class="skip" on:click={toStory}
			>Go to visual/interactive story</button
		>
	</div>
	<p>{@html copy.description}</p>
	<p>{@html copy.byline}</p>

	{#each steps as step}
		{#if step.id === "survey-basic"}
			<p class="interactive">
				Hi, how are you doing? Options: ok, good, not great, or busy.
			</p>
		{:else if step.id === "survey-words"}
			<p class="interactive">
				Can you think any other words for the simple word you chose earlier?
			</p>
		{:else if step.id === "survey-body"}
			<p class="interactive">
				Take a moment here to pause and notice your body. Start at the top-most
				part of your body and scan down through your center, out to your edges.
			</p>
		{:else if step.id === "survey-needs"}
			<p class="interactive">What does your body need right now?</p>
		{:else}
			{#each step.text as p}
				{#if step.id === "resources"}
					<h3>{@html p.title}</h3>
					<ul>
						{#each p.bullets as bullet}
							<li>{@html bullet}</li>
						{/each}
					</ul>
				{:else}
					<p>{@html p}</p>
				{/if}
			{/each}
		{/if}
	{/each}
</div>
<Footer />

<style>
	.plain {
		max-width: 700px;
		margin: 0 auto;
		font-size: var(--18px);
		font-family: var(--sans);
		letter-spacing: normal;
		word-spacing: normal;
		display: none;
	}
	.plain.visible {
		display: block;
	}
	.subtitle {
		margin-bottom: 1em;
		font-size: var(--16px);
	}
	:global(body) {
		background-color: white;
	}
	button {
		font-family: var(--sans);
		letter-spacing: normal;
		word-spacing: normal;
		border: none;
		margin-bottom: 3em;
	}
	h1 {
		text-align: center;
	}
	.title-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	.interactive {
		font-style: italic;
	}

	@media (max-width: 700px) {
		.plain {
			margin: 0 1em;
		}
	}
</style>
