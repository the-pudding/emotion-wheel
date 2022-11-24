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
	<span class="circle"><Icon name="message-square" /></span>
	<span class="text">{@html text}</span>
</div>

<style>
	.comment {
		position: absolute;
		z-index: 10;
		width: 36px;
		height: 36px;
		background: white;
		border-top-right-radius: 18px;
		border-top-left-radius: 18px;
		border-bottom-right-radius: 18px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
		transition: all 400ms;
		font-size: var(--12px);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	span.circle {
		display: flex;
		align-items: center;
		justify-content: center;
		background: black;
		color: white;
		width: 27px;
		height: 27px;
		border-radius: 14px;
		flex-shrink: 0;
		font-family: var(--sans);
	}
	span.text {
		margin: 1em;
	}
	.comment:hover {
		cursor: pointer;
		min-width: 200px;
		height: auto;
		transform: translate(0, -20%);
	}
	.comment:hover span.circle {
		margin-left: 1em;
	}
	.comment:hover span.text {
		display: block;
	}
	span.text {
		display: none;
	}
</style>
