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
	export let withColor = false;

	let svg;
	// TODO: fix this
	let width = 1200;
	let height = 688;
	let r = 20;
	$: xCenters = { ok: width * 0.2, good: width * 0.5, busy: width * 0.8 };
	$: nodes = [
		{ id: "source-ok", fx: width * 0.2, fy: height },
		{ id: "source-good", fx: width * 0.5, fy: height },
		{ id: "source-busy", fx: width * 0.8, fy: height },
		...data
	];
	$: links = ["ok", "good", "busy"].reduce((acc, current) => {
		const matchingNodes = nodes.filter((d) => d.basic_word === current);
		const linkage = matchingNodes.map((d) => ({
			source: `source-${current}`,
			target: d.id
		}));
		return [...acc, ...linkage];
	}, []);

	$: console.log({ nodes, links });

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
			.attr("transform", (d) => {
				d.x = Math.max(r, Math.min(width - r, d.x));
				d.y = Math.max(r, Math.min(height - r, d.y));

				return `translate(${d.x}, ${d.y})`;
			});
	};

	$: simulation = forceSimulation(nodes)
		.force("charge", forceManyBody().strength(5))
		//.force("center", forceCenter(width / 2, height / 2))
		.force(
			"x",
			forceX().x(function (d) {
				if (!width) return 0;
				return xCenters[d[wordAccessor]];
			})
		)
		// .force(
		// 	"y",
		// 	forceY().y((d) => {
		// 		return height / 2;
		// 	})
		// )
		.force(
			"collision",
			forceCollide().radius(function (d) {
				return r * 1.2;
			})
		)
		.force(
			"link",
			forceLink()
				.links(links)
				.id((d) => d.id)
				.distance((d) => height / 2)
		)
		.on("tick", ticked);
</script>

<div class="viz">
	<svg bind:this={svg}>
		<g class="links">
			{#each links as l}
				<line stroke="darkgrey" />
			{/each}
		</g>

		<g class="nodes">
			{#each nodes as n, i}
				{@const opacity = _.startsWith(n.id, "source") ? 0 : 1}
				<g class="node" {opacity}>
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
		height: 70vh;
	}
	svg {
		/* background: lightsteelblue; */
		height: 100%;
		width: 100%;
	}
	text {
		font-size: var(--16px);
		text-anchor: middle;
		alignment-baseline: middle;
	}
</style>
