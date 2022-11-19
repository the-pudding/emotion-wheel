<script>
	import { currentPanel } from "$stores/misc.js";
	import inView from "$actions/inView.js";
	import mq from "$stores/mq.js";

	export let animation = true;

	export let i;
	export let img;

	let onScreen = false;
</script>

<img
	class:roll-in={$mq.desktop && animation && ($currentPanel === i || onScreen)}
	class:visible={!$mq.desktop || !animation}
	src={`assets/img/${img}`}
	use:inView
	on:enter={() => (onScreen = true)}
	on:exit={() => (onScreen = false)}
/>

<style>
	img {
		position: absolute;
		left: 40%;
		width: 400px;
		bottom: 8%;
		opacity: 0;
	}
	.visible {
		opacity: 1;
	}

	img.roll-in {
		opacity: 1;
		animation: spin 3s ease-out;
	}

	@keyframes spin {
		0% {
			opacity: 0;
			left: 100%;
			transform: rotate(0deg);
		}
		100% {
			opacity: 1;
			left: 40%;
			transform: rotate(360deg);
		}
	}

	@media (max-height: 600px) {
		img {
			width: 200px;
		}
	}
</style>
