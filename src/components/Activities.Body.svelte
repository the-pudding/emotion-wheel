<script>
	import BodyDraw from "$components/BodyDraw.svelte";
	import copy from "$data/copy.json";

	export let screenshotEl;
</script>

<div class="body">
	<h2>Where do you feel it in your body?</h2>

	<details class="description">
		<summary>How to use this</summary>
		<p>{@html copy.activitiesPage.body}</p>
	</details>

	<BodyDraw bind:screenshotEl isActivitiesPage={true} />
</div>

<style>
	.body {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
	h2 {
		text-align: center;
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
