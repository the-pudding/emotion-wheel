<script>
	import {
		forceSimulation,
		select,
		forceManyBody,
		forceCollide,
		forceCenter,
		forceX,
		forceY,
		forceLink,
		range
	} from "d3";
	import variables from "$data/variables.json";
	import determineFontColor from "$utils/determineFontColor";
	import _ from "lodash";

	export let data;
	export let wordAccessor;
	export let groupBy;
	export let withColor = false;

	let svg;
	let width = 0;
	let height = 0;
	let r = 15;

	$: console.log({ width, height });

	$: nodes = data;
	$: links = nodes.reduce((acc, current) => {
		const likeMe = nodes.filter((d) => {
			return d[groupBy] === current[groupBy];
		});
		const linkage = likeMe.map((d) => ({
			source: current.id,
			target: d.id,
			value: 10
		}));
		const filtered = linkage.filter(
			(d) =>
				d.source !== d.target &&
				!acc.some((a) => a.source === d.target && a.target === d.source)
		);
		return [...acc, ...filtered];
	}, []);

	const ticked = () => {
		select(svg)
			.selectAll("g.node")
			.data(nodes)
			.join("g.node")
			.attr("transform", (d) => {
				d.x = Math.max(r * 1.2, Math.min(width - r * 1.2, d.x));
				d.y = Math.max(r * 1.2, Math.min(height - r * 1.2, d.y));

				return `translate(${d.x}, ${d.y})`;
			});
	};

	$: if (width && height) setupSimulation();

	const setupSimulation = () => {
		forceSimulation(nodes)
			.force("charge", forceManyBody().strength(-20))
			.force("center", forceCenter(width / 2, height / 2))
			.force(
				"collision",
				forceCollide().radius((d) => r * 1.2)
			)
			.force(
				"y",
				forceY()
					.y((d) => height / 2)
					.strength(-0.02)
			)
			.force(
				"link",
				forceLink()
					.links(links)
					.id((d) => d.id)
					.distance((d) => r * 1.2)
			)
			.on("tick", ticked);
	};

	let highlightedId;
	const onMouseEnter = (e) => {
		if (wordAccessor !== "basic_word")
			highlightedId = e.target.id.split("-")[0];
	};
	const onMouseLeave = () => {
		if (wordAccessor !== "basic_word") highlightedId = undefined;
	};

	$: console.log({ data });
</script>

<div class="viz" bind:clientWidth={width} bind:clientHeight={height}>
	<svg bind:this={svg}>
		<text class="title" x={width / 2} y={height / 2}
			>Here's how the last 100 people to visit this site felt.</text
		>
		<g class="nodes">
			{#each nodes as n, i}
				{@const opacity =
					highlightedId && n.id.split("-")[0] !== highlightedId ? 0.2 : 1}
				<g
					id={n.id}
					class="node"
					{opacity}
					on:mouseenter={onMouseEnter}
					on:mouseleave={onMouseLeave}
				>
					<ellipse
						rx={r}
						ry={r * 1.2}
						fill={withColor ? n.color : variables.color["grey-balloon"]}
					/>
					<text
						class="label"
						fill={withColor ? determineFontColor(n.color) : null}
						>{n[wordAccessor]}</text
					>
				</g>
			{/each}
		</g>
	</svg>
</div>

<style>
	.viz {
		width: 70%;
		height: 60vh;
		transform: translate(0, -10vh);
	}
	svg {
		/* background: lightsteelblue; */
		height: 100%;
		width: 100%;
	}
	text.label {
		font-size: var(--14px);
		text-anchor: middle;
		alignment-baseline: middle;
	}
	text.title {
		font-size: var(--28px);
		text-anchor: middle;
	}
	.node:hover {
		cursor: pointer;
	}
</style>
