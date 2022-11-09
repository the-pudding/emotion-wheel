<script>
	import { currentPanel } from "$stores/misc.js";
	import inView from "$actions/inView.js";

	export let i;
	export let img;

	let onScreen = false;
</script>

<img
	class:roll-in={$currentPanel === i || onScreen}
	src={`assets/img/${img}`}
	use:inView
	on:enter={() => (onScreen = true)}
	on:exit={() => (onScreen = false)}
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
		animation: spin 3s ease-out;
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
