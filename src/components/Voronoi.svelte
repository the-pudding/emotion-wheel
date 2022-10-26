<script>
	import { voronoiTreemap } from "d3-voronoi-treemap";
	import { hierarchy, select, selectAll, line, range } from "d3";
	import { onMount } from "svelte";

	export let data;

	// TODO: group by color, another level of depth
	// key: data, value: [word, color, frequency]

	let svg;
	let group;
	const canvasHeight = 500;
	const canvasWidth = 500;
	const margin = { top: 20, right: 20, bottom: 20, left: 20 };
	const innerHeight = canvasHeight - margin.top - margin.bottom;
	const innerWidth = canvasWidth - margin.left - margin.right;

	const circleClip = range(100).map((i) => [
		(innerWidth * (1 + 0.99 * Math.cos((i / 50) * Math.PI))) / 2,
		(innerHeight * (1 + 0.99 * Math.sin((i / 50) * Math.PI))) / 2
	]);

	const frequencyHeirarchy = hierarchy(data, (d) => d.children).sum(
		(d) => d.frequency
	);
	const withColor = (hierarchy) => {
		if (hierarchy.depth === 0) {
			hierarchy.color = "black";
		} else if (hierarchy.depth === 1) {
			hierarchy.color = hierarchy.data.color;
		} else {
			hierarchy.color = hierarchy.parent.color;
		}
		if (hierarchy.children) {
			hierarchy.children.forEach((child) => withColor(child));
		}
	};

	var treemap = voronoiTreemap().clip(circleClip);
	treemap(frequencyHeirarchy);
	withColor(frequencyHeirarchy);

	const allNodes = frequencyHeirarchy
		.descendants()
		.sort((a, b) => b.depth - a.depth)
		.map((d, i) => Object.assign({}, d, { id: i }));

	onMount(() => {
		select(group)
			.selectAll("path")
			.data(allNodes)
			.enter()
			.append("path")
			.attr("d", (d) => "M" + d.polygon.join("L") + "Z")
			.style("fill", (d) => d.color)
			.attr("stroke", "white")
			.attr("stroke-width", 1)
			.style("fill-opacity", (d) => (d.depth === 0 ? 0 : 1));
	});
</script>

<svg bind:this={svg} width={canvasWidth} height={canvasHeight}>
	<g bind:this={group} transform={`translate(${margin.left}, ${margin.top})`} />
</svg>

<style>
	svg {
		flex-shrink: 0;
	}
</style>
