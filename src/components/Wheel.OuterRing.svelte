<script>
	import { wheelSections, outerWords } from "$utils/words.js";
	import { moveTo, arcTo, polarToSvg } from "$utils/wheelHelpers.js";

	export let r;
	export let margin;
</script>

<g id="words-ring">
	{#each wheelSections as section, index}
		{@const startingAngle = ((2 * Math.PI) / wheelSections.length) * index}
		{@const endingAngle = ((2 * Math.PI) / wheelSections.length) * (index + 1)}
		{@const haloRadius = r + 35}
		{@const surroundingWordPath =
			moveTo(
				polarToSvg(
					{
						r: index >= 3 ? haloRadius : haloRadius - 20,
						theta: index >= 3 ? startingAngle : endingAngle
					},
					r + margin,
					r + margin
				)
			) +
			arcTo(
				haloRadius,
				polarToSvg(
					{
						r: index >= 3 ? haloRadius : haloRadius - 20,
						theta: index >= 3 ? endingAngle : startingAngle
					},
					r + margin,
					r + margin
				),
				index >= 3 ? 0 : 0,
				index >= 3 ? 0 : 1
			)}

		<g key={index}>
			<path id={`section${index}`} d={surroundingWordPath} fill="none" />
			<text>
				<textPath
					href={`#section${index}`}
					textAnchor="middle"
					fill={section.color}
					startOffset="50%"
				>
					{outerWords[index].join(" • ")}
				</textPath>
			</text>
		</g>
	{/each}
</g>
