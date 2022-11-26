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
	button.skip {
		position: absolute;
		top: 53%;
		left: 75%;
		transform: translate(-50%, -50%);
	}

	@media (max-height: 600px) {
		.needs {
			max-width: 250px;
		}
	}
</style>
