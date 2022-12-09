<script>
	import {
		soundOn,
		showPause,
		showInfo,
		showPlain,
		userMuted,
		currentPanel
	} from "$stores/misc.js";
	import Modal from "$components/Modal.svelte";
	import Button from "$components/Button.svelte";
	import volumeOn from "$svg/icons/volume-on.svg";
	import volumeOff from "$svg/icons/volume-off.svg";
	import pause from "$svg/icons/pause.svg";
	import play from "$svg/icons/play.svg";
	import info from "$svg/icons/info.svg";
	import copy from "$data/copy.json";

	export let visible;

	$: pulse = $currentPanel === 1 && !$showPause;

	const mute = () => {
		$soundOn = !$soundOn;
		if (!$soundOn) $userMuted = true;
		else $userMuted = false;
	};
	const exit = () => {
		$showPause = !$showPause;
		if ($showPause) $soundOn = false;
		else if (!$userMuted) $soundOn = true;
	};
	const openInfo = () => {
		$showInfo = true;
	};
	const goToPlain = () => {
		$showPlain = true;
		$showInfo = false;
		$soundOn = false;
	};
</script>

<div class="top-bar" class:visible>
	<button
		class="exit-btn"
		class:pulse
		on:click={exit}
		aria-label={$showPause ? "resume the story" : "pause the story"}
	>
		{@html $showPause ? play : pause}
	</button>
	<button
		class="mute-btn"
		on:click={mute}
		aria-label={$soundOn ? "turn volume off" : "turn volume on"}
	>
		{@html $soundOn ? volumeOn : volumeOff}
	</button>
	<button class="info-btn" on:click={openInfo} aria-label="info">
		{@html info}
	</button>
</div>

<Modal bind:visible={$showInfo}>
	<h3>About this project</h3>
	{#each copy.info as text}
		<div class="modal-text">{@html text}</div>
	{/each}

	<div>
		If you prefer a text-only version of the story,
		<Button onClick={goToPlain} animate={false}>click here</Button>
	</div>
</Modal>

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
	.modal-text {
		margin: 0.5em 0;
	}
	button.skip {
		background: white;
	}
	h3 {
		margin: 0;
	}
	button:not(.skip) {
		background: none;
		height: 30px;
		width: 30px;
		padding: 0;
		margin: 0 0.8em;
	}
	button.exit-btn {
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
		transform: scale(1);
		border-radius: 15px;
	}
	button.exit-btn.pulse {
		animation: pulse calc(var(--1s) * 1.5) infinite;
	}

	@media (max-height: 600px) {
		.top-bar {
			font-size: var(--12px);
			line-height: 14px;
		}
	}

	@media (max-height: 400px) {
		.top-bar {
			flex-direction: column;
			top: 1em;
			right: 2em;
		}
		button:not(.skip) {
			margin: 0.8em 0;
		}
	}
</style>
