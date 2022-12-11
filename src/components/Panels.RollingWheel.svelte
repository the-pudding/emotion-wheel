<script>
	import { currentPanel, zoomModalImage, modalAlt } from "$stores/misc.js";
	import inView from "$actions/inView.js";
	import mq from "$stores/mq.js";

	export let animation = true;

	export let i;
	export let img;

	$: id = img.replace(".png", "");

	let onScreen = false;

	const onClick = () => {
		$zoomModalImage = `wheels/${id}`;
		$modalAlt =
			id === "grey_wheel_blank"
				? "grey emotion wheel with i'm fine in the center"
				: id === "simple_wheel_color"
				? "colorful emotion wheel with no words"
				: id === "final_wheel"
				? "Abby's emotion wheel, with 6 sections and around 100 words."
				: null;
	};
</script>

<button
	on:click={onClick}
	class:visible={!$mq.desktop || !animation}
	class:roll-in={$mq.desktop && animation && ($currentPanel === i || onScreen)}
	class:big={img === "final_wheel.png"}
	use:inView
	on:enter={() => (onScreen = true)}
	on:exit={() => (onScreen = false)}
>
	<img
		{id}
		srcset={`assets/img/wheels/${id}-sm.png 500w, assets/img/wheels/${id}-lg.png 800w`}
		sizes={`(max-width: 600px) 800px, 1000px`}
		src={`assets/img/wheels/${id}-lg.png`}
		alt="rolling emotion wheel"
	/>
</button>

<style>
	button {
		background: none;
		position: absolute;
		left: 65%;
		bottom: 8%;
		width: 400px;
		opacity: 0;
		transition: transform calc(var(--1s) * 0.5);
	}
	img.big {
		width: 500px;
	}
	.visible {
		opacity: 1;
	}
	img:hover {
		transform: scale(1.03);
	}

	.roll-in {
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
