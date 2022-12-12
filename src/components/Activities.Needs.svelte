<script>
	import NeedsChecklist from "$components/NeedsChecklist.svelte";
	import Button from "$components/Button.svelte";
	import copy from "$data/copy.json";
	import checks from "$svg/needs-activities.svg";
	import blueChecks from "$svg/needs-blue.svg";
	import redChecks from "$svg/needs-red.svg";
	import purpleChecks from "$svg/needs-purple.svg";
	import greenChecks from "$svg/needs-green.svg";
	import orangeChecks from "$svg/needs-orange.svg";
	import yellowChecks from "$svg/needs-yellow.svg";
	import mq from "$stores/mqWidth.js";
	import _ from "lodash";

	export let needs;
	export let closeBtn;

	const options = _.shuffle([
		{ svg: purpleChecks, name: "purple" },
		{ svg: greenChecks, name: "green" },
		{ svg: orangeChecks, name: "orange" },
		{ svg: redChecks, name: "red" },
		{ svg: blueChecks, name: "blue" },
		{ svg: yellowChecks, name: "yellow" }
	]);
	let i = 0;
	$: currentChecks = options[i].svg;
	$: currentColor = options[i].name;

	const next = () => {
		if (i < options.length - 1) i += 1;
		else i = 0;
	};

	const clearNeeds = () => {
		needs = [];
	};
</script>

<div class="needs">
	<h2>What do you need?</h2>

	<details class="description">
		<summary>How to use this</summary>
		<p>{@html copy.activitiesPage.needs}</p>
	</details>

	{#if $mq.md}
		<Button onClick={next} marginBottom={"1em"}>Next section</Button>

		{#key currentColor}
			<NeedsChecklist
				checks={currentChecks}
				imgSrc={`assets/activities/needs-${currentColor}.png`}
				wheelId={currentColor}
				bind:selected={needs}
				nextSelectable={closeBtn}
				isActivities={true}
			/>
		{/key}
	{:else}
		<Button onClick={clearNeeds} small={true}>clear</Button>

		<NeedsChecklist
			{checks}
			imgSrc={"assets/activities/needs.png"}
			wheelId={"needs-activities"}
			bind:selected={needs}
			nextSelectable={closeBtn}
			isActivities={true}
		/>
	{/if}
</div>

<style>
	.needs {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}
	h2 {
		text-align: center;
		padding: 0 1em;
	}
	.description {
		text-align: center;
		max-width: 600px;
		margin: 1em 0;
	}
	.description:hover {
		cursor: pointer;
	}
</style>
