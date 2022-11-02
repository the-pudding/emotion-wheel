<script>
	import { wheelSections } from "$utils/words.js";
	import Subsection from "$components/Wheel.Subsection.svelte";

	export let section;
	export let index;
	export let handleSectionClick;
	export let selectedSections;
	export let r;

	const startingAngle = ((2 * Math.PI) / wheelSections.length) * index;
	const endingAngle = ((2 * Math.PI) / wheelSections.length) * (index + 1);
	const numLayers = section.words.length;
	let layerWidth = r / numLayers;
	const subsections = [];

	for (let i = 0; i < numLayers; i++) {
		const numSections = section.words[i].length;
		const sectionAngle = (endingAngle - startingAngle) / numSections;

		const layerWidths = [r * 0.25, r * 0.35, r * 0.33];

		for (let j = 0; j < numSections; j++) {
			subsections.push({
				section,
				sectionIndex: index,
				layerIndex: i,
				layerWidth,
				layerWidths,
				positionInLayer: j,
				color: section.color,
				startingAngle,
				sectionAngle,
				handleSectionClick,
				selectedSections,
				r
			});
		}
	}
</script>

{#each subsections as subsection, index}
	<Subsection key={index} {...subsection} />
{/each}
