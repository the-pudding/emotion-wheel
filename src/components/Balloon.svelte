<script>
	export let color;
</script>

<div class="balloon" style={`--color: ${color}`} />

<style>
	.balloon {
		display: inline-block;
		width: 120px;
		height: 145px;
		background: var(--color);
		border-radius: 80%;
		position: relative;
		box-shadow: inset -10px -10px 0 rgba(0, 0, 0, 0.07);
		margin: 20px 30px;
		transition: transform 0.5s ease;
		z-index: 10;
		animation: balloons 4s ease-in-out infinite;
		transform-origin: bottom center;
	}

	@keyframes balloons {
		0%,
		100% {
			transform: translateY(0) rotate(-1deg);
		}
		50% {
			transform: translateY(-10px) rotate(1deg);
		}
	}

	.balloon:before {
		content: "▲";
		font-size: 20px;
		color: var(--color);
		display: block;
		text-align: center;
		width: 100%;
		position: absolute;
		bottom: -15px;
		z-index: -100;
	}

	.balloon:after {
		display: inline-block;
		top: 153px;
		position: absolute;
		height: 250px;
		width: 1px;
		margin: 0 auto;
		content: "";
		background: rgba(0, 0, 0, 0.2);
	}
</style>
