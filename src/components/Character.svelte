<script>
	import WalkingSprite from "$components/Character.WalkingSprite.svelte";
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
		visibleWidth,
		currentPanel
	} from "$stores/misc.js";
	import variables from "$data/variables.json";
	import determineFontColor from "$utils/determineFontColor.js";
	import scrollX from "$stores/scrollX.js";
	import _ from "lodash";
	import mq from "$stores/mq.js";
	import { onMount, tick } from "svelte";

	export let innerHeight;

	const formatLabel = (str) =>
		str === "somethings-wrong"
			? "something's wrong"
			: _.startCase(str).toLowerCase();

	let svg;
	let simulation;
	let imageWidth = 0;
	let hoveredBalloon = undefined;
	$: r = $mq.sm ? 12 : $mq.md ? 15 : 20;
	$: fx = imageWidth * 0.4;
	$: fy = innerHeight ? innerHeight * 0.37 : 100;
	$: stringLength = svgHeight * 0.35;
	$: svgHeight = innerHeight * 0.5;
	$: svgWidth = $visibleWidth ? $visibleWidth : 0;
	$: balloonsDisappear = $currentPanel >= 28;

	let nodes = [
		{ name: "source", fx: 0, fy: 0 },
		...range(1).map((d) => ({ name: d }))
	];
	$: links = range(numBalloons).map((d) => ({ source: 0, target: d + 1 }));
	$: numBalloons = $words.length > 0 ? $words.length : 1;

	$: numBalloons, newBalloons();
	$: $colors, colorChange();
	$: $scrollX, scrollChange();
	$: fy, fx, updateSourceLocation();

	const scrollChange = () => {
		if ($scrollX && simulation) {
			const source = nodes.find((d) => d.name === "source");
			source.fx = $scrollX + fx;
			simulation.alpha(0.5).restart();
		}
	};
	const updateSourceLocation = () => {
		const source = nodes.find((d) => d.name === "source");
		source.fx = fx;
		source.fy = fy;
	};
	const newBalloons = async () => {
		if (simulation) {
			nodes = [
				{ name: "source", fx, fy },
				...range(numBalloons).map((d) => ({ name: d }))
			];

			setUpSimulation();

			const source = nodes.find((d) => d.name === "source");
			source.fx = $scrollX + fx;
			simulation.alpha(0.5).restart();
		}
	};
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

	const setUpSimulation = async () => {
		simulation = forceSimulation(nodes)
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
			);

		if ($mq.reducedMotion) {
			while (simulation.alpha() > simulation.alphaMin()) {
				simulation.tick();
			}
			await tick();
			ticked();
		} else {
			simulation.on("tick", ticked);
		}
	};

	onMount(() => {
		setUpSimulation();
	});

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

	const onBalloonHover = (e) => {
		if (nodes.length > 2) {
			hoveredBalloon = e.target.id;
		}
	};
	const onBalloonExit = () => {
		hoveredBalloon = undefined;
	};
</script>

<WalkingSprite bind:width={imageWidth} />

<svg
	id="character-balloon-area"
	width={svgWidth}
	height={svgHeight}
	bind:this={svg}
	class:visible={$entered && !balloonsDisappear}
	class:reducedMotion={$mq.reducedMotion}
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
			{@const faded =
				hoveredBalloon &&
				l.target.name !== parseInt(hoveredBalloon.split("-")[1])}
			<line stroke="darkgrey" class:faded />
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
			{@const faded =
				hoveredBalloon &&
				hoveredBalloon !== `${label}-${n.name}` &&
				n.name !== "source"}
			<g
				class="node"
				class:faded
				id={`${label}-${n.name}`}
				{opacity}
				on:mouseenter={onBalloonHover}
				on:mouseleave={onBalloonExit}
			>
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
					<text class="label">{formatLabel(label)}</text>
				{/if}
			</g>
		{/each}
	</g>
</svg>

<style>
	.balloon-container {
		margin: 20px;
		text-align: center;
		display: flex;
		height: 500px;
	}
	svg {
		position: absolute;
		bottom: 0;
		z-index: 1;
		pointer-events: none;
		opacity: 0;
		transition: opacity var(--1s);
	}
	svg.visible {
		opacity: 1;
	}
	svg.reducedMotion {
		position: fixed;
		width: 100vw;
	}
	g.node {
		pointer-events: all;
	}
	.faded {
		opacity: 0.1;
	}
	text.label {
		alignment-baseline: central;
		text-anchor: middle;
		font-size: 0.6em;
	}
	:global(ellipse.balloon) {
		opacity: 0.9;
	}
</style>
