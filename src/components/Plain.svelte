<script>
	import { showPlain } from "$stores/misc.js";
	import copy from "$data/copy.json";

	export let visible;

	const steps = copy.steps.filter((d) => d.text);

	const toStory = () => {
		$showPlain = false;
	};
</script>

<div class="plain" class:visible>
	<button on:click={toStory}>Return to story</button>
	<h1>{@html copy.title}</h1>
	<p>{@html copy.description}</p>
	<p>{@html copy.byline}</p>

	{#each steps as step}
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
	{/each}
</div>

<style>
	.plain {
		max-width: 700px;
		margin: 0 auto;
		font-size: var(--18px);
		font-family: var(--sans);
		letter-spacing: normal;
		display: none;
	}
	.plain.visible {
		display: block;
	}
	:global(body) {
		background-color: white;
	}
	button {
		font-family: var(--sans);
	}
</style>
