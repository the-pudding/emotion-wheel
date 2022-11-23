<div class="container">
	<h3>Please rotate your device.</h3>
	<img src="assets/img/rotate.png" />
	<p>This immersive experience is designed to be viewed in landscape mode.</p>
</div>

<style>
	.container {
		z-index: 100;
		height: 100%;
		width: 100%;
		position: fixed;
		padding: 5em 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: var(--sans);
		background-color: var(--color-gray-300);
	}
	h3,
	p {
		text-align: center;
	}
	img {
		max-width: 300px;
	}
</style>
