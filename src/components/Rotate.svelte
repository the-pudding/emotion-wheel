<script>
	export let visible;
</script>

<div class="rotate" class:visible>
	<img src="assets/img/simple_wheel_color.png" />

	<h3>Please rotate your device.</h3>

	<p>This immersive experience is designed to be viewed in landscape mode.</p>
</div>

<style>
	.rotate {
		z-index: 100;
		height: 100%;
		width: 100%;
		position: fixed;
		padding: 5em 2em;
		flex-direction: column;
		align-items: center;
		font-family: var(--sans);
		letter-spacing: normal;
		word-spacing: normal;
		background-color: var(--color-fg);
		color: white;
		display: none;
	}
	.rotate.visible {
		display: flex;
	}
	h3,
	p {
		text-align: center;
	}
	img {
		max-width: 300px;
		animation: spin calc(var(--1s) * 4.5) infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		70% {
			transform: rotate(-360deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
</style>
