<script>
	export let text;
</script>

<div class="resources">
	<h2>Resources <span>(Scroll to see more)</span></h2>
	<div class="sections">
		{#each text as { title, bullets }}
			<details>
				<summary>{title}</summary>
				<ul>
					{#each bullets as bullet}
						<li>{@html bullet}</li>
					{/each}
				</ul>
			</details>
		{/each}
	</div>
</div>

<style>
	.resources {
		position: absolute;
		top: 10%;
		left: 0;
		height: 65%;
		padding: 0 2em;
		display: flex;
		flex-direction: column;
	}
	.sections {
		font-size: var(--16px);
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		overflow-y: scroll;
		overflow-x: hidden;
		width: 70%;
		min-width: 500px;
		height: 100%;
	}
	h2 {
		width: fit-content;
		font-weight: bold;
		margin-bottom: 0;
	}
	h2 span {
		display: none;
		font-size: var(--18px);
	}
	details:not(:first-child) {
		margin-top: 1em;
	}
	summary:hover {
		cursor: pointer;
	}
	.sections::-webkit-scrollbar {
		width: 10px;
	}
	.sections::-webkit-scrollbar-thumb {
		background: var(--color-gray-700);
		border-radius: 10px;
	}

	@media (max-height: 600px) {
		.resources {
			top: 1%;
		}
		h2 span {
			display: inline-block;
			font-size: var(--18px);
		}
	}
</style>
