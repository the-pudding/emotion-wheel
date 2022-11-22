<script>
	import NeedsChecklist from "$components/NeedsChecklist.svelte";
	import { needs } from "$stores/misc.js";
	import needsChecks from "$svg/needs-checks.svg";

	export let text;

	$: disabled = $needs.length > 0;

	const skip = () => {
		$needs = [""];
	};
</script>

<NeedsChecklist
	checks={needsChecks}
	wheelId={"needs-checks"}
	bind:selected={$needs}
	limit={5}
/>

<button class="skip" on:click={skip} {disabled}>skip</button>

<div class="needs">
	{#each text as t}
		<p>{@html t}</p>
	{/each}
</div>

<style>
	:global(div#survey-needs svg#needs-checks) {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	:global(#needs-checks rect):hover {
		cursor: pointer;
	}
	:global(#needs-checks rect) {
		opacity: 0;
	}
	:global(#needs-checks path) {
		opacity: 0;
	}
	:global(#needs-checks path.highlighted) {
		opacity: 0.9;
	}
	.needs {
		position: absolute;
		left: 5%;
		top: 40%;
		transform: translate(0, -50%);
		max-width: 450px;
	}
	.needs p:nth-child(3) {
		font-size: 16px;
		margin: 0.5em 0;
	}
	.options {
		margin-bottom: 1em;
	}
	button.option {
		background: none;
		font-size: 1.6em;
		padding: 0;
		margin: 0 20px;
	}
	button.skip {
		position: absolute;
		bottom: 18%;
		left: 80%;
	}
	button:first-of-type {
		margin-left: 0;
	}
	button:hover,
	button.selected {
		text-decoration: underline;
	}

	@media (max-height: 600px) {
		.needs {
			max-width: 250px;
		}
	}
</style>
