<script>
	import inView from "$actions/inView.js";

	let visible = false;
</script>

<img
	class:roll-in={visible}
	src={`assets/img/grey_wheel_blank.png`}
	use:inView
	on:enter={() => (visible = true)}
	on:exit={() => (visible = false)}
/>

<style>
	img {
		position: absolute;
		bottom: 3em;
		left: 40vw;
		width: 30%;
		opacity: 0;
	}

	img.roll-in {
		opacity: 1;
		animation: spin 4s linear;
	}

	@keyframes spin {
		0% {
			left: 100%;
			transform: rotate(0deg);
		}
		100% {
			left: 40vw;
			transform: rotate(360deg);
		}
	}
</style>
