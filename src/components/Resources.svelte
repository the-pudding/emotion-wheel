<script>
	export let text;
</script>

<div class="resources">
	<h2>Resources</h2>
	<div class="sections">
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
		flex-wrap: wrap;
		overflow-y: scroll;
		overflow-x: hidden;
		width: auto;
	}
	.section {
		width: 40%;
	}
	h2 {
		text-decoration: underline;
	}

	@media (max-height: 600px) {
		h2 {
			font-size: var(--24px);
		}
		h3 {
			font-size: var(--18px);
		}
		.resources {
			font-size: var(--12px);
		}

		.sections {
			font-size: var(--12px);
		}
	}

	@media (max-height: 900px) {
		.section {
			width: auto;
		}
		.sections {
			flex-wrap: nowrap;
			padding-right: 1em;
			width: 70%;
		}
		.sections::-webkit-scrollbar {
			width: 10px;
		}
		.sections::-webkit-scrollbar-track {
			border: 1px solid darkgrey;
			border-radius: 10px;
		}
		.sections::-webkit-scrollbar-thumb {
			background: var(--color-gray-700);
			border-radius: 10px;
		}
	}
</style>
