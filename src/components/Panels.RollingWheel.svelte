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
	class:big={img === "final_wheel.png"}
	src={`assets/img/${img}`}
	use:inView
	on:enter={() => (onScreen = true)}
	on:exit={() => (onScreen = false)}
	alt="rolling emotion wheel"
/>

<style>
	img {
		position: absolute;
		left: 45%;
		width: 400px;
		bottom: 8%;
		opacity: 0;
	}
	img.big {
		width: 500px;
	}
	img.visible {
		opacity: 1;
	}

	img.roll-in {
		opacity: 1;
		animation: spin calc(var(--1s) * 3) ease-out;
	}

	@keyframes spin {
		0% {
			opacity: 0;
			left: 100%;
			transform: rotate(0deg);
		}
		100% {
			opacity: 1;
			left: 45%;
			transform: rotate(-360deg);
		}
	}

	@media (max-height: 600px) {
		img {
			width: 200px;
		}
		img.big {
			width: 250px;
		}
	}
</style>
