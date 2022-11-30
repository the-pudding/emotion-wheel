<script>
	import { soundOn, showPause, showInfo } from "$stores/misc.js";
	import Icon from "$components/helpers/Icon.svelte";
	import Modal from "$components/TopBar.Modal.svelte";

	export let visible;

	const mute = () => {
		$soundOn = !$soundOn;
	};
	const pause = () => {
		$showPause = !$showPause;
	};
	const info = () => {
		$showInfo = true;
	};
</script>

<div class="top-bar" class:visible>
	<button class="exit-btn" on:click={pause}>
		<Icon
			name={$showPause ? "play" : "pause"}
			strokeWidth={3}
			height={"100%"}
			width={"100%"}
		/>
	</button>
	<button class="mute-btn" on:click={mute}>
		<Icon
			name={$soundOn ? "volume-2" : "volume-x"}
			strokeWidth={3}
			height={"100%"}
			width={"100%"}
		/>
	</button>
	<button class="info-btn" on:click={info}>
		<Icon name="info" strokeWidth={3} height={"100%"} width={"100%"} />
	</button>
</div>

<Modal />

<style>
	.top-bar {
		display: none;
		align-items: center;
		position: fixed;
		top: 1em;
		right: 1em;
		z-index: 10;
		font-size: var(--14px);
		font-family: var(--sans);
		letter-spacing: normal;
		height: 50px;
	}
	.top-bar.visible {
		display: flex;
	}

	button {
		background: none;
	}

	@media (max-height: 600px) {
		.top-bar {
			font-size: var(--12px);
			line-height: 14px;
		}
	}
</style>
