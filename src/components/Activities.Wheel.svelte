<script>
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import slices from "$svg/slices.svg";
	import copy from "$data/copy.json";

	export let words;
	export let closeBtn;
</script>

<div class="wheel">
	<h2>Hi, how are you feeling?</h2>

	<details class="description">
		<summary>How to use this</summary>
		<p>{@html copy.activitiesPage.wheel}</p>
	</details>

	<ClickableWheel
		{slices}
		imgSrc={`../assets/activities/wheel`}
		wheelId="the-wheel"
		bind:selected={words}
		withColor={true}
		nextSelectable={closeBtn}
	/>
</div>

<style>
	.wheel {
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
