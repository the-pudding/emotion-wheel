<script>
	import { showComments } from "$stores/misc.js";
	import mq from "$stores/mq.js";

	export let i;
	export let text;
	export let location = "[50, 50]";
	export let k;
	export let hoveredComment;

	const onClick = () => {
		hoveredComment = i;
	};

	$: open = hoveredComment === i;
	$: cleaned = location
		.replace("[", "")
		.replace("]", "")
		.split(",")
		.map((d) => +d);
	$: left = open ? "50%" : `${cleaned[0]}%`;
	$: top = open ? "50%" : `${cleaned[1]}%`;
	$: scale = 1 / k;
</script>

<div
	class="comment"
	style:left
	style:top
	style:scale
	class:visible={$showComments}
	class:open
	on:click={!$mq.desktop ? onClick : null}
	on:blur={() => console.log("ya")}
>
	💡
	<span class="text">{@html text}</span>
</div>

<style>
	.comment {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		background: white;
		padding: 0.5em;
		transform-origin: 0 0;
		font-size: var(--16px);
		background: var(--color-gray-700);
		height: 36px;
		width: 36px;
		border-radius: 18px;
		z-index: 10;
		transform: none;
	}
	.open {
		transform: translate(-50%, -50%);
		z-index: 11;
	}
	.comment .text {
		display: none;
		margin-left: 0.6em;
		font-size: var(--18px);
	}
	.comment:hover .text {
		display: block;
	}
	.comment:hover {
		cursor: pointer;
		width: auto;
		max-width: 400px;
		height: auto;
		max-height: 200px;
		background: white;
		border: 3px solid var(--color-gray-700);
	}
</style>
