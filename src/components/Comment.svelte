<script>
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
	<span class="circle">AV</span>
	<span class="text">{@html text}</span>
</div>

<style>
	.comment {
		position: absolute;
		z-index: 10;
		width: 32px;
		height: 32px;
		background: white;
		border-top-right-radius: 16px;
		border-top-left-radius: 16px;
		border-bottom-right-radius: 16px;
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
		background: orange;
		width: 24px;
		height: 24px;
		border-radius: 12px;
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
