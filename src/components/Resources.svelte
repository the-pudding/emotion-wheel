<script>
	export let text;

	let containerEl;
</script>

<div class="resources" bind:this={containerEl}>
	{#each text as { title, bullets }}
		<div class="section">
			<h3>{@html title}</h3>
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
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		top: 10%;
		left: 0;
		overflow-y: scroll;
		overflow-x: hidden;
		height: 65%;
		padding: 0 2em;
	}
	.section {
		margin: 0 0.5em;
		width: 40%;
	}

	@media (max-height: 600px) {
		h3 {
			font-size: var(--18px);
		}
		.resources {
			font-size: var(--12px);
			flex-wrap: nowrap;
		}
		.section {
			width: auto;
		}
	}
</style>
