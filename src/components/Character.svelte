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
	import { colors, words } from "$stores/misc.js";

	export let scrollLeft;

	let svg;
	const height = 400;
	const r = 20;
	const fx = 112;
	const fy = 310;

	$: numBalloons = $words.length > 0 ? $words.length : 1;
	$: nodes = [
		{ name: "source", fx, fy },
		...range(numBalloons).map((d) => ({ name: d }))
	];
	$: links = range(numBalloons).map((d) => ({ source: 0, target: d + 1 }));

	$: numBalloons, newBalloons();
	const newBalloons = async () => {
		if (simulation) {
			const source = nodes.find((d) => d.name === "source");
			source.fx = scrollLeft + fx;
			simulation.alpha(0.5).restart();
		}
	};

	$: $colors, colorChange();
	const colorChange = () => {
		select(svg)
			.selectAll("ellipse")
			.attr("fill", (d, i) => {
				if (d.name === "source") return null;
				return $colors[i - 1] || "lightgrey";
			});
	};

	$: scrollLeft, scrollChange();
	const scrollChange = () => {
		if (scrollLeft && simulation) {
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
			.attr("class", (d) => (d.name === "source" ? "source" : "balloon"))
			.attr("cx", (d) => d.x)
			.attr("cy", (d) => d.y);
	};

	$: simulation = forceSimulation(nodes)
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

<svg width={"2000%"} {height} bind:this={svg} transition:fade>
	{#each links as l}
		<line stroke="darkgrey" />
	{/each}
	{#each nodes as n}
		{@const opacity = n.name === "source" ? 0 : 1}
		<ellipse rx={r} ry={r * 1.2} {opacity} />
	{/each}
</svg>

<style>
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
	:global(ellipse.balloon) {
		stroke-width: 1px;
		stroke: darkgrey;
		opacity: 0.7;
	}
</style>
