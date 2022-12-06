<script>
	import { currentPanel, zoomModalImage } from "$stores/misc.js";
	import inView from "$actions/inView.js";
	import mq from "$stores/mq.js";

	export let animation = true;

	export let i;
	export let img;

	$: id = img.replace(".png", "");

	let onScreen = false;

	const onClick = () => {
		$zoomModalImage = id;
	};
</script>

<img
	{id}
	class:roll-in={$mq.desktop && animation && ($currentPanel === i || onScreen)}
	class:visible={!$mq.desktop || !animation}
	class:big={img === "final_wheel.png"}
	src={`assets/img/${img}`}
	use:inView
	on:enter={() => (onScreen = true)}
	on:exit={() => (onScreen = false)}
	on:click={onClick}
	alt="rolling emotion wheel"
/>

<style>
	img {
		position: absolute;
		left: 65%;
		width: 400px;
		bottom: 8%;
		opacity: 0;
		transition: transform calc(var(--1s) * 0.5);
	}
	img.big {
		width: 500px;
	}
	img.visible {
		opacity: 1;
	}
	img:hover {
		cursor: pointer;
		transform: scale(1.03);
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
			left: 65%;
			transform: rotate(-360deg);
		}
	}

	@media (max-height: 600px) {
		img {
			width: 200px;
		}
		img.big {
			width: 200px;
		}
	}
</style>
