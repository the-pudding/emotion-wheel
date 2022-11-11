<script>
	export let text;

	let containerEl;
</script>

<div class="resources" bind:this={containerEl}>
	{#each text as { title, bullets }}
		<div class="section">
			<h2>{@html title}</h2>
			<ul>
				{#each bullets as bullet}
					<li>{@html bullet}</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
	.resources {
		position: absolute;
		font-size: var(--16px);
		width: 500px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		height: 70%;
	}
	.section {
		margin: 0 0.5em;
	}
</style>
