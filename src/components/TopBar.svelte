<script>
	import { base } from "$app/paths";
	import { soundOn, showPlain, showPause } from "$stores/misc.js";
	import { annotate } from "svelte-rough-notation";
	import Toggle from "$components/helpers/Toggle.svelte";
	import Icon from "$components/helpers/Icon.svelte";

	let toggleValue = "off";
	let modalVisible = false;

	$: toggleValue, ($showPlain = toggleValue === "on");

	const mute = () => {
		$soundOn = !$soundOn;
	};
	const pause = () => {
		$showPause = !$showPause;
	};
</script>

<div class="top-bar">
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
	<button class="info-btn" on:mouseenter={() => (modalVisible = true)}>
		<Icon name="info" strokeWidth={3} height={"100%"} width={"100%"} />
	</button>
	<!-- <a href={`${base}/activities`} target="_blank">Go to activities page</a>
		<button class="mute" on:click={mute}>{$soundOn ? "Mute" : "Unmute"}</button>
		<Toggle label="Text Version" style="inner" bind:value={toggleValue} /> -->
</div>

<div
	id="top-bar-modal"
	class:visible={modalVisible}
	on:mouseleave={() => (modalVisible = false)}
>
	<div>A little about this project.</div>
	<div>Authors</div>
	<a href={`${base}/activities`} target="_blank">Go to activities page</a>
	<Toggle label="Text Version" style="inner" bind:value={toggleValue} />
</div>

<style>
	.top-bar {
		display: flex;
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

	button {
		background: none;
	}
	#top-bar-modal {
		visibility: hidden;
		position: fixed;
		right: 1.5em;
		top: 1.5em;
		background: white;
		z-index: 100;
	}
	#top-bar-modal.visible {
		visibility: visible;
	}

	.mute {
		background: none;
		border-bottom: 1px solid currentColor;
		font-family: var(--sans);
		padding: 0;
		margin: 0 1em;
		line-height: inherit;
	}
	.mute:hover {
		color: var(--color-gray-700);
	}

	@media (max-height: 600px) {
		.top-bar {
			font-size: var(--12px);
			line-height: 14px;
		}
	}
</style>
