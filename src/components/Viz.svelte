<script>
	import BalloonBunch from "$components/Viz.BalloonBunch.svelte";
	import variables from "$data/variables.json";
	import { userId } from "$stores/misc.js";
	import { fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import _ from "lodash";

	export let data;
	export let wordAccessor;
	export let withColor = false;

	const getTimespan = (date) => {
		const diff = Math.abs(new Date(date) - new Date());

		const minutes = diff / 1000 / 60;
		if (minutes < 60) return { value: minutes.toFixed(0), unit: "minute" };

		const hours = minutes / 60;
		if (hours < 24) return { value: hours.toFixed(0), unit: "hour" };

		const days = hours / 24;
		return { value: days.toFixed(0), unit: "day" };
	};
</script>

<div class="balloons" in:fly={{ y: 200, duration: 1000, easing: quintOut }}>
	{#each data.filter((d) => d.id !== $userId) as d}
		{@const allWords = d[wordAccessor].split("|")}
		{@const indexes = _.sampleSize(_.range(allWords.length), 3)}
		{@const words = indexes.map((i) => allWords[i])}
		{@const colors = withColor
			? indexes.map((i) => d.colors.split("|")[i])
			: _.fill(Array(indexes.length), variables.color["grey-balloon"])}
		{@const timespan = getTimespan(d.created_at)}

		<BalloonBunch id={d.id} {words} {colors} {timespan} />
	{/each}
</div>

<style>
	.balloons {
		width: 70%;
		display: flex;
		flex-wrap: wrap;
		align-self: flex-start;
		margin-top: 2em;
	}
</style>
