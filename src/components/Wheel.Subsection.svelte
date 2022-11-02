<script>
	import { moveTo, lineTo, arcTo, polarToSvg } from "$utils/wheelHelpers.js";
	import _ from "lodash";

	export let section;
	export let sectionIndex;
	export let layerIndex;
	export let layerWidth;
	export let layerWidths;
	export let positionInLayer;
	export let color;
	export let startingAngle;
	export let sectionAngle;
	export let handleSectionClick;
	export let selectedSections;
	export let r;

	const isFlipped = (sectionIndex, positionInLayer) => {
		if (sectionIndex === 0 || sectionIndex === 5) return false;
		if (sectionIndex === 2 || sectionIndex === 3) return true;

		if (sectionIndex === 1 && positionInLayer >= 4 && positionInLayer <= 7)
			return true;
		if (sectionIndex === 4 && positionInLayer >= 0 && positionInLayer <= 3)
			return true;

		return false;
	};

	// const innerRadius = layerIndex * layerWidths[layerIndex];
	// const outerRadius = (layerIndex + 1) * layerWidths[layerIndex];
	const innerRadius = _.sum(_.take(layerWidths, layerIndex));
	const outerRadius = _.sum(_.take(layerWidths, layerIndex + 1));

	const theta = startingAngle + positionInLayer * sectionAngle;
	const thetaPrime = startingAngle + (positionInLayer + 1) * sectionAngle;
	const textAngle = isFlipped(sectionIndex, positionInLayer)
		? theta + (thetaPrime - theta) * (2 / 3)
		: theta + (thetaPrime - theta) / 3;

	const word = section.words[layerIndex][positionInLayer];

	let path = moveTo(polarToSvg({ r: innerRadius, theta: theta }, r, r));
	path = path + lineTo(polarToSvg({ r: outerRadius, theta: theta }, r, r));
	path =
		path +
		arcTo(outerRadius, polarToSvg({ r: outerRadius, theta: thetaPrime }, r, r));
	path = path + lineTo(polarToSvg({ r: innerRadius, theta: thetaPrime }, r, r));
	if (layerIndex > 0) {
		path =
			path +
			arcTo(innerRadius, polarToSvg({ r: innerRadius, theta: theta }, r, r));
	}

	let textPath = moveTo(
		polarToSvg(
			{
				r: isFlipped(sectionIndex, positionInLayer) ? outerRadius : innerRadius,
				theta: textAngle
			},
			r,
			r
		)
	);
	textPath += lineTo(
		polarToSvg(
			{
				r: isFlipped(sectionIndex, positionInLayer) ? innerRadius : outerRadius,
				theta: textAngle
			},
			r,
			r
		)
	);

	const opacity = selectedSections.includes(word) ? "0.6" : "1";

	const specialSizingCases = {
		"imposter syndrome": "9px",
		"taken advantage of": "8.5px",
		"self-conscious": "12px"
	};

	const innerWordLocations = [
		{ x: 270, y: 235 }, // orange, genius
		{ x: 238, y: 210 }, // yellow, joy
		{ x: 180, y: 235 }, // green, disgust
		{ x: 190, y: 270 }, // purple, fear
		{ x: 238, y: 300 }, // blue, sad
		{ x: 270, y: 270 } // red, anger
	];
</script>

<g>
	<path
		d={path}
		class="section"
		fill={color}
		stroke="white"
		strokeWidth={2}
		{opacity}
	/>
	<path id={word} d={textPath} />
	<!-- {#if layerIndex !== 0}
		<text>
			<textPath
				href={`#${word}`}
				side={"right"}
				class={layerIndex === 1 ? "inner" : "outer"}
				textAnchor="middle"
				startOffset="50%"
				fill="white"
			>
				{word}
			</textPath>
		</text>
	{:else}
		<text
			x={innerWordLocations[sectionIndex].x}
			y={innerWordLocations[sectionIndex].y}
			fill="white"
		>
			{word}
		</text>
	{/if} -->
	<path
		data-id={word}
		d={path}
		onClick={handleSectionClick}
		fill="transparent"
		key={word}
	/>
</g>

<style>
	text {
		font-size: var(--12px);
	}
</style>
