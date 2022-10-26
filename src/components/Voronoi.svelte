<script>
	import { voronoiTreemap } from "d3-voronoi-treemap";
	import { hierarchy, select, selectAll, line } from "d3";
	import { onMount } from "svelte";
	export let data;

	$: console.log({ data });

	let svg;
	let height = 500;
	let width = 500;

	function weightAccessor(d) {
		console.log(d);
		return d.frequency; // computes the weight of one of your data; depending on your data, it may be 'd.area', or 'd.percentage', ...
	}

	var treemap = voronoiTreemap().clip([
		[0, 0],
		[0, height],
		[width, height],
		[width, 0]
	]); // sets the clipping polygon

	onMount(() => {
		var rootNode = hierarchy(data); // a d3-hierarchy of your nested data
		treemap(rootNode); // computes the weighted Voronoi tessellation of the d3-hierarchy; assigns a 'polygon' property to each node of the hierarchy
		rootNode.sum(weightAccessor); // assigns the adequate weight to each node of the d3-hierarchy

		var allNodes = rootNode.descendants();
		console.log({ allNodes, rootNode });

		select(svg)
			.selectAll("path")
			.data(allNodes)
			.enter()
			.append("path")
			.attr("d", function (d) {
				// d is a node
				return line()(d.polygon) + "z"; // d.polygon is the computed Voronoï cell encoding the relative weight of your underlying original data
			})
			.style("fill", function (d) {
				return "red";
			});
	});
</script>

<svg bind:this={svg} {height} {width} />

<style>
	svg {
		background: lightgrey;
	}
</style>
