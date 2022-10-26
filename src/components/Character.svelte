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
	import { colors, words, basicFeeling } from "$stores/misc.js";

	export let scrollLeft;
	export let numSteps;

	let svg;
	const r = 20;
	const fx = 114;
	const fy = 308;

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
		}
	};

	$: $colors, colorChange();
	const colorChange = () => {
		if ($colors.length) {
			select(svg)
				.selectAll("ellipse")
				.data(nodes)
				.attr("fill", (d, i) => {
					if (d.name === "source") return null;
					return $colors[i - 1] ? $colors[i - 1] : "lightgrey";
				});
		}
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
			.selectAll("g.node")
			.data(nodes)
			.join("g.node")
			.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
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

<svg width={`${numSteps * 100}%`} height={400} bind:this={svg} transition:fade>
	<g class="links">
		{#each links as l}
			<line stroke="darkgrey" />
		{/each}
	</g>

	<g class="nodes">
		{#each nodes as n, i}
			{@const opacity = n.name === "source" ? 0 : 1}
			{@const label = $words[i - 1]
				? $words[i - 1]
				: $basicFeeling
				? $basicFeeling
				: ""}
			<g class="node" {opacity}>
				<ellipse
					class={n.name === "source" ? "source" : "balloon"}
					rx={r}
					ry={r * 1.2}
					fill="rgb(216,216,216)"
				/>
				<text class="label">{label}</text>
			</g>
		{/each}
	</g>
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
		/* z-index: 1; */
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
	text.label {
		alignment-baseline: central;
		text-anchor: middle;
		font-size: 0.6em;
	}
	:global(ellipse.balloon) {
		stroke-width: 1px;
		stroke: darkgrey;
		opacity: 0.7;
	}
</style>
