<script>
	import { soundOn, showPause, showInfo } from "$stores/misc.js";
	import Modal from "$components/TopBar.Modal.svelte";
	import volumeOn from "$svg/icons/volume-on.svg";
	import volumeOff from "$svg/icons/volume-off.svg";
	import pause from "$svg/icons/pause.svg";
	import play from "$svg/icons/play.svg";
	import info from "$svg/icons/info.svg";

	export let visible;

	const mute = () => {
		$soundOn = !$soundOn;
	};
	const exit = () => {
		$showPause = !$showPause;
		if ($showPause) $soundOn = false;
	};
	const openInfo = () => {
		$showInfo = true;
	};
</script>

<div class="top-bar" class:visible>
	<button class="exit-btn" on:click={exit}>
		{@html $showPause ? play : pause}
	</button>
	<button class="mute-btn" on:click={mute}>
		{@html $soundOn ? volumeOn : volumeOff}
	</button>
	<button class="info-btn" on:click={openInfo}>
		{@html info}
	</button>
</div>

<Modal />

<style>
	:global(svg.icon:hover path) {
		fill: var(--color-gray-600);
	}
	.top-bar {
		display: none;
		align-items: center;
		position: fixed;
		top: 2em;
		right: 1em;
		z-index: 10;
		font-size: var(--14px);
		font-family: var(--sans);
		letter-spacing: normal;
		word-spacing: normal;
		height: 50px;
	}
	.top-bar.visible {
		display: flex;
	}

	button {
		background: none;
		height: 30px;
		width: 30px;
		padding: 0;
		margin: 0 0.8em;
	}

	@media (max-height: 600px) {
		.top-bar {
			font-size: var(--12px);
			line-height: 14px;
		}
	}
</style>
