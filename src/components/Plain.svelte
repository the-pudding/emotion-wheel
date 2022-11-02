<script>
	import copy from "$data/copy.json";

	const steps = copy.steps.filter((d) => d.text);
</script>

<div class="wrapper">
	<h1>{@html copy.title}</h1>
	<div>{@html copy.description}</div>
	<div>{@html copy.byline}</div>

	{#each steps as step}
		{#each step.text as p}
			<p>{@html p}</p>
		{/each}
	{/each}
</div>

<style>
	.wrapper {
		max-width: 700px;
		margin: 0 auto;
		font-size: var(--18px);
	}
</style>
