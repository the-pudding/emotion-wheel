<script>
	import variables from "$data/variables.json";

	export let data;
	export let wordAccessor;
	export let colorAccessor = (d) => variables.color["grey-balloon"];

	$: console.log({ data });

	let hovered;
	const onMouseEnter = (e) => {
		hovered = parseInt(e.target.id.replace("balloon-", ""));
	};
	const onMouseLeave = (e) => {
		hovered = undefined;
	};

	const getTimespan = (date) => {
		const diff = Math.abs(new Date(date) - new Date());

		const minutes = diff / 1000 / 60;
		if (minutes < 60) return { value: minutes.toFixed(0), unit: "minute" };

		const hours = minutes / 60;
		if (hours < 24) return { value: hours.toFixed(0), unit: "hour" };

		const days = hours / 24;
		return { value: days.toFixed(0), unit: "day" };
	};
</script>

<div class="balloons">
	{#each data as d, i}
		{@const labelVisible = hovered === d.id}
		{@const timespan = getTimespan(d.created_at)}
		<div
			class="balloon"
			id={`balloon-${d.id}`}
			style={`--fill: ${colorAccessor(d)}; --duration: ${3 + Math.random()}s`}
			on:mouseenter={onMouseEnter}
			on:mouseleave={onMouseLeave}
		>
			{wordAccessor(d)}
			<span class:visible={labelVisible}
				>{timespan.value}
				{timespan.unit}{timespan.value > 1 ? "s" : ""} ago</span
			>
		</div>
	{/each}
</div>

<style>
	.balloons {
		width: 80%;
		display: flex;
		flex-wrap: wrap;
		align-self: flex-start;
		margin-top: 2em;
	}
	.balloon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: var(--16px);
		width: 60px;
		height: 72.5px;
		background: var(--fill);
		border-radius: 80%;
		position: relative;
		box-shadow: inset -5px -5px 0 rgba(0, 0, 0, 0.07);
		margin: 10px 15px;
		transition: transform 0.5s ease;
		z-index: 2;
		animation: balloons var(--duration) ease-in-out infinite;
		transform-origin: bottom center;
	}
	.balloon:hover {
		cursor: pointer;
	}
	.balloon span {
		font-size: var(--12px);
		color: var(--color-gray-800);
		white-space: nowrap;
		opacity: 0.5;
	}
	.balloon span.visible {
		opacity: 1;
	}

	@keyframes balloons {
		0%,
		100% {
			transform: translateY(0) rotate(-2deg);
		}
		50% {
			transform: translateY(-8px) rotate(2deg);
		}
	}

	.balloon:before {
		content: "▲";
		font-size: 10px;
		color: var(--fill);
		display: block;
		text-align: center;
		width: 100%;
		position: absolute;
		bottom: -8px;
	}

	.balloon:after {
		display: inline-block;
		top: 76px;
		left: 29px;
		position: absolute;
		height: 100px;
		width: 1px;
		margin: 0 auto;
		content: "";
		background: rgba(0, 0, 0, 0.2);
	}
</style>
