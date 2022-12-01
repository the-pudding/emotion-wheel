<script>
	import Icon from "$components/helpers/Icon.svelte";

	export let text;
	export let location = "[50, 50]";

	$: cleaned = location
		.replace("[", "")
		.replace("]", "")
		.split(",")
		.map((d) => +d);
	$: left = `${cleaned[0]}%`;
	$: top = `${cleaned[1]}%`;
</script>

<div class="comment" style:left style:top>
	<span class="circle" />
	<span class="text">{@html text}</span>
</div>

<style>
	.comment {
		position: absolute;
		z-index: 10;
		width: 36px;
		height: 36px;
		background: red;
		border-top-right-radius: 18px;
		border-top-left-radius: 18px;
		border-bottom-right-radius: 18px;
		box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px;
		transition: transform calc(var(--1s) * 0.4);
		font-size: var(--16px);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	span.circle {
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		width: 26px;
		height: 26px;
		border-radius: 13px;
		flex-shrink: 0;
		font-family: var(--sans);
		letter-spacing: normal;
		word-spacing: normal;
	}
	span.text {
		margin: 1em;
	}
	.comment:hover {
		cursor: pointer;
		min-width: 200px;
		height: auto;
		transform: translate(0, -20%);
		justify-content: flex-start;
		background: white;
	}
	.comment:hover span.circle {
		display: none;
	}
	.comment:hover span.text {
		display: block;
	}
	span.text {
		display: none;
	}
</style>
