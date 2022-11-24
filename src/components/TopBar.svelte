<script>
	import { base } from "$app/paths";
	import { soundOn, showPlain } from "$stores/misc.js";
	import { annotate } from "svelte-rough-notation";
	import Toggle from "$components/helpers/Toggle.svelte";

	let toggleValue = "off";

	$: toggleValue, ($showPlain = toggleValue === "on");

	const mute = () => {
		$soundOn = !$soundOn;
	};
</script>

<div id="top-bar-wrapper">
	<div
		class="top-bar"
		use:annotate={{
			type: "box",
			animate: false,
			visible: true,
			color: "black",
			padding: 0
		}}
	>
		<a href={`${base}/activities`}>Go to activities page</a>
		<button class="mute" on:click={mute}>{$soundOn ? "Mute" : "Unmute"}</button>
		<Toggle label="Text Version" style="inner" bind:value={toggleValue} />
	</div>
</div>

<style>
	.top-bar {
		display: flex;
		align-items: center;
		position: absolute;
		top: 1em;
		right: 1em;
		z-index: 10;
		font-size: var(--14px);
		line-height: 22px;
		font-family: var(--sans);
		letter-spacing: normal;
		background: white;
		padding: 0.8em 1.2em;
	}

	:global(#top-bar-wrapper svg) {
		z-index: 10;
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
