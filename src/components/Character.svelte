<script>
	import { fade } from "svelte/transition";
	import {
		forceSimulation,
		select,
		forceManyBody,
		forceCollide,
		forceY,
		forceLink,
		range
	} from "d3";

	export let scrollLeft;

	let svg;
	let numBalloons = 4;
	const height = 400;
	const r = 20;
	const fx = 100;
	const fy = 318;

	let nodes = [
		{ name: "source", fx, fy },
		...range(numBalloons).map((d) => ({ name: d }))
	];
	const links = range(numBalloons).map((d) => ({ source: 0, target: d + 1 }));

	$: scrollLeft, scrollChange();
	const scrollChange = () => {
		if (scrollLeft) {
			const source = nodes.find((d) => d.name === "source");
			source.fx = scrollLeft + fx;
			simulation.alpha(0.5).restart();
		}
	};

	const ticked = () => {
		select(svg)
			.selectAll("line")
			.data(links)
			.join("line")
			.attr("x1", (d) => d.source.x)
			.attr("y1", (d) => d.source.y)
			.attr("x2", (d) => d.target.x)
			.attr("y2", (d) => d.target.y);

		select(svg)
			.selectAll("ellipse")
			.data(nodes)
			.join("ellipse")
			.attr("cx", (d) => d.x)
			.attr("cy", (d) => d.y);
	};

	const simulation = forceSimulation(nodes)
		.force("charge", forceManyBody().strength(5))
		.force(
			"collision",
			forceCollide().radius((d) => r)
		)
		.force(
			"y",
			forceY().y((d) => {
				if (d.name === "source") return 500;
				return 0;
			})
		)
		.force(
			"link",
			forceLink()
				.links(links)
				.distance((d) => 150)
		)
		.on("tick", ticked);
</script>

<img class="character" src={`assets/img/character.png`} transition:fade />

<svg width={"1000%"} {height} bind:this={svg} transition:fade>
	{#each links as l}
		<line stroke="darkgrey" />
	{/each}
	{#each nodes as n}
		{@const opacity = n.name === "source" ? 0 : 1}
		<ellipse rx={r} ry={r * 1.2} {opacity} />
	{/each}
</svg>

<style>
	.container {
	}
	.character {
		position: absolute;
		bottom: 0;
		height: 150px;
		position: sticky;
		left: 4em;
		bottom: 2em;
	}
	.character,
	svg {
		z-index: 1;
	}
	.balloon-container {
		margin: 20px;
		text-align: center;
		display: flex;
		height: 500px;
	}
	svg {
		position: absolute;
		bottom: 0;
	}
	ellipse:nth-of-type(2) {
		fill: orange;
	}
	ellipse:nth-of-type(3) {
		fill: purple;
	}
	ellipse:nth-of-type(4) {
		fill: yellow;
	}
	ellipse:nth-of-type(5) {
		fill: green;
	}
</style>
