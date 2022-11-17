<script>
	let location = [Math.random() * 100, Math.random() * 100];
	let comment =
		"This is a thought about this spot in the piece. It's a very good thought and I'm glad you're reading it.";
</script>

<div
	class="comment"
	style:left={`${location[0]}%`}
	style:top={`${location[1]}%`}
>
	<span class="circle">AV</span>
	<span class="text">{comment}</span>
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
		background: rgb(150, 197, 173);
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
		transform: translate(0, -50%);
	}
	.comment:hover span.circle {
		margin-left: 1em;
	}
	.comment:hover span.text {
		display: block;
	}
	span {
		display: none;
	}
</style>
