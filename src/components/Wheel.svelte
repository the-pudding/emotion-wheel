<script>
	import Section from "$components/Wheel.Section.svelte";
	import { wheelSections } from "$utils/words.js";

	let width;
	let height;
	$: r = height / 2;
	$: margin = 0;

	// TODO: selection
	// TODO: responsiveness
	let selectedSections = [];

	const handleSectionClick = (e) => {
		const clickedId = e.target.dataset.id;
		if (selectedSections.includes(clickedId)) {
			const updatedSelectedSections = selectedSections.filter(
				(s) => s !== clickedId
			);
			setSelectedSections(updatedSelectedSections);
		} else {
			setSelectedSections([...selectedSections, clickedId]);
		}
	};
</script>

<div class="img-container" bind:clientHeight={height} bind:clientWidth={width}>
	<img src="../assets/wheel/emotion_wheel.png" />

	{#if width && height}
		<svg
			id="the-wheel"
			{height}
			{width}
			opacity={0.5}
			transform={`translate(${width * 0.014}, ${height * 0.013})`}
		>
			<g id="wheel" transform={`translate(${margin}, ${margin})`}>
				{#each wheelSections as section, index}
					<Section
						key={index}
						{section}
						{index}
						{handleSectionClick}
						{selectedSections}
						{r}
					/>
				{/each}
			</g>
		</svg>
	{/if}
</div>

<style>
	.img-container {
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;
		width: fit-content;
		margin: 0 auto;
	}
	img {
		max-width: 80vw;
		max-height: 100vh;
	}
	svg {
		position: absolute;
		top: 0;
	}
</style>
