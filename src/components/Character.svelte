<script>
	import {
		forceSimulation,
		select,
		forceManyBody,
		forceCollide,
		forceY,
		forceLink,
		range
	} from "d3";
	import {
		colors,
		words,
		basicFeeling,
		entered,
		visibleWidth
	} from "$stores/misc.js";
	import variables from "$data/variables.json";
	import determineFontColor from "$utils/determineFontColor.js";
	import { fade } from "svelte/transition";
	import scrollX from "$stores/scrollX.js";
	import _ from "lodash";
	import mq from "$stores/mq.js";

	let svg;
	const r = $mq.desktop ? 20 : 12;
	const fx = $mq.desktop ? 98 : 65;
	const fy = $mq.desktop ? 278 : 350;
	const stringLength = $mq.desktop ? 150 : 75;

	$: console.log({ r, fx, fy });
	const formatLabel = (str) => _.startCase(str).toLowerCase();

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
			source.fx = $scrollX + fx;
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
					return $colors[i - 1]
						? $colors[i - 1]
						: variables.color["grey-balloon"];
				});

			select(svg)
				.selectAll("polygon")
				.data(nodes)
				.attr("fill", (d, i) => {
					if (d.name === "source") return null;
					return $colors[i - 1]
						? $colors[i - 1]
						: variables.color["grey-balloon"];
				});

			select(svg)
				.selectAll("text")
				.data(nodes)
				.attr("fill", (d, i) => {
					if (d.name === "source") return null;
					const balloonColor = $colors[i - 1]
						? $colors[i - 1]
						: variables.color["grey-balloon"];
					return determineFontColor(balloonColor);
				});
		}
	};

	$: $scrollX, scrollChange();
	const scrollChange = () => {
		if ($scrollX && simulation) {
			const source = nodes.find((d) => d.name === "source");
			source.fx = $scrollX + fx;
			simulation.alpha(0.5).restart();
		}
	};

	const ticked = () => {
		select(svg)
			.selectAll("line")
			.data(links)
			.attr("x1", (d) => d.source.x)
			.attr("y1", (d) => d.source.y)
			.attr("x2", (d) => d.target.x)
			.attr("y2", (d) => d.target.y);

		select(svg)
			.selectAll("g.node")
			.data(nodes)
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
				.distance((d) => stringLength)
		)
		.on("tick", ticked);

	const testFly = () => {
		// 	const source = nodes.find((d) => d.name === "source");
		// 	source.fy = 0;
		// 	simulation.velocityDecay(0).restart();
	};
</script>

<img
	class="character"
	class:visible={$entered}
	src={`assets/img/wagon.png`}
	on:click={testFly}
/>

<svg
	id="character-balloon-area"
	width={$visibleWidth}
	height={200}
	bind:this={svg}
	class:visible={$entered}
>
	<filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
		<feComponentTransfer in="SourceAlpha">
			<feFuncA type="table" tableValues="1 0" />
		</feComponentTransfer>
		<feGaussianBlur stdDeviation="4" />
		<feOffset dx="6" dy="-5" result="offsetblur" />
		<feFlood flood-color="rgb(0, 0, 0, 0.3)" result="color" />
		<feComposite in2="offsetblur" operator="in" />
		<feComposite in2="SourceAlpha" operator="in" />
		<feMerge>
			<feMergeNode in="SourceGraphic" />
			<feMergeNode />
		</feMerge>
	</filter>

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
				<polygon
					points={`0,${r + 2} -3,${r + 8} 3,${r + 8}`}
					class="triangle"
					fill={variables.color["grey-balloon"]}
					opacity={0.75}
				/>
				<ellipse
					class={n.name === "source" ? "source" : "balloon"}
					rx={r}
					ry={r * 1.2}
					fill={variables.color["grey-balloon"]}
					filter="url(#inset-shadow)"
				/>

				{#if label !== ""}
					<text class="label" transition:fade>{formatLabel(label)}</text>
				{/if}
			</g>
		{/each}
	</g>
</svg>

<style>
	.character,
	svg {
		opacity: 0;
		transition: opacity 1s;
	}
	.visible {
		opacity: 1;
	}
	.character {
		height: 75px;
		position: fixed;
		left: 4em;
		top: 77%; /*TODO*/
	}
	.character {
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
	text.label {
		alignment-baseline: central;
		text-anchor: middle;
		font-size: 0.6em;
	}
	:global(ellipse.balloon) {
		opacity: 0.9;
	}
	@media (hover: hover) and (pointer: fine) {
		.character {
			height: 150px;
			position: sticky;
		}
	}
</style>
