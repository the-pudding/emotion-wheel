<script>
	import copy from "$data/copy.json";

	const steps = copy.steps.filter((d) => d.text);

	$: console.log({ copy });
</script>

<div class="wrapper">
	<h1>{@html copy.title}</h1>
	<div>{@html copy.description}</div>
	<div>{@html copy.byline}</div>

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
	.wrapper {
		max-width: 700px;
		margin: 0 auto;
		font-size: var(--18px);
		font-family: var(--sans);
		letter-spacing: normal;
	}
	:global(body) {
		background-color: white;
	}
</style>
