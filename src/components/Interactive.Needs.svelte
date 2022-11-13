<script>
	import { needs } from "$stores/misc.js";
	import _ from "lodash";

	export let text;

	$: disabled = $needs.length > 0;

	const options = ["a hug", "to talk to a friend", "to punch a pillow"];

	const skip = () => {
		$needs = [_.sample(options)];
	};

	const select = (e) => {
		const need = e.target.id;
		if ($needs.includes(need)) {
			$needs = $needs.filter((d) => d !== need);
		} else {
			$needs = [...$needs, need];
		}
	};
</script>

<div class="words">
	{#each text as t}
		<p>{@html t}</p>
	{/each}

	<div class="options">
		{#each options as d}
			{@const selected = $needs.includes(d)}
			<button on:click={select} id={d} class="option" class:selected>{d}</button
			>
		{/each}
	</div>

	<button class="skip" on:click={skip} {disabled}>skip</button>
</div>

<style>
	.words {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
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
	button:first-of-type {
		margin-left: 0;
	}
	button:hover,
	button.selected {
		text-decoration: underline;
	}
</style>
