<script>
	import { currentPanel } from "$stores/misc.js";

	export let i;
	export let img;
</script>

<img class:roll-in={$currentPanel === i} src={`assets/img/${img}`} />

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
