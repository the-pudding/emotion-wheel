<script>
	import determineFontColor from "$utils/determineFontColor";

	export let id;
	export let words;
	export let colors;
	export let timespan;
</script>

<div
	class="bunch"
	id={`balloon-bunch-${id}`}
	style={`--duration: ${2 + Math.random()}s`}
>
	<span
		>{timespan.value}
		{timespan.unit}{timespan.value > 1 ? "s" : ""} ago</span
	>
	{#each words as word, i}
		<div
			class="balloon"
			class:multi={words.length > 1}
			style:color={determineFontColor(colors[i])}
			style={`--fill: ${colors[i]}`}
		>
			{word}
		</div>
	{/each}
</div>

<style>
	.bunch {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		font-size: var(--16px);
		width: 60px;
		height: 72.5px;
		margin: 10px 15px;
		transition: transform 0.5s ease;
		z-index: 2;
		animation: balloons var(--duration) ease-in-out infinite;
		transform-origin: bottom center;
	}
	.balloon {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		background-color: var(--fill);
		border-radius: 80%;
		box-shadow: inset 8px -3px 6px rgba(0, 0, 0, 0.1);
		width: 100%;
		height: 100%;
	}
	.balloon.multi {
		width: 50%;
		height: 50%;
		font-size: var(--12px);
	}
	.bunch span {
		font-size: var(--12px);
		white-space: nowrap;
		opacity: 0.5;
		position: absolute;
		top: -10px;
	}

	@keyframes balloons {
		0%,
		100% {
			transform: translateY(0) rotate(-1deg);
		}
		50% {
			transform: translateY(-4px) rotate(1deg);
		}
	}

	.balloon:before {
		content: "▲";
		font-size: 10px;
		color: var(--fill);
		opacity: 0.75;
		display: block;
		text-align: center;
		width: 100%;
		position: absolute;
		bottom: -10px;
	}
	.balloon.multi:before {
		font-size: 8px;
	}

	.balloon:after {
		display: inline-block;
		top: 76px;
		left: 29px;
		position: absolute;
		height: 120px;
		width: 1px;
		margin: 0 auto;
		content: "";
		background: rgba(0, 0, 0, 0.06);
		z-index: -1;
	}
	.balloon.multi:after {
		top: 38px;
		left: 15px;
	}
</style>
