<script>
	export let visible;
</script>

<div class="loading" class:visible>
	<img
		srcset={`assets/img/wheels/simple_wheel_color-sm.png 500w, assets/img/wheels/simple_wheel_color-lg.png 800w`}
		sizes={`(max-width: 600px) 500px, 800px`}
		src="assets/img/wheels/simple_wheel_color-lg.png"
		alt="rotating emotion wheel to indicate loading"
	/>

	<h3>Loading...</h3>
</div>

<style>
	.loading {
		display: none;
		position: fixed;
		background: white;
		height: 100%;
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transition: opacity var(--1s);
	}
	.loading.visible {
		display: flex;
	}

	img {
		max-width: 150px;
		animation: spin calc(var(--1s) * 4.5) linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
</style>
