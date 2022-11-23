<script>
	import { base } from "$app/paths";
	import Loading from "$components/Loading.svelte";
	import Toggle from "$components/helpers/Toggle.svelte";
	import Plain from "$components/Plain.svelte";
	import Story from "$components/Story.svelte";
	import Rotate from "$components/Rotate.svelte";
	import {
		entered,
		scrolled,
		scrollMax,
		soundOn,
		stepWidth
	} from "$stores/misc.js";
	import mq from "$stores/mq.js";
	import { onMount } from "svelte";

	let toggleValue = "off";
	const ratio = 1920 / 1080;
	let innerHeight;
	let isLandscape;

	$: loading = !innerHeight;
	$: askToRotate = innerHeight && !isLandscape && !$mq.desktop;
	$: $stepWidth = innerHeight * ratio;
	$: $entered = $scrolled >= $scrollMax;

	const mute = () => {
		$soundOn = !$soundOn;
	};

	onMount(() => {
		isLandscape = window.matchMedia("(orientation: landscape)").matches;

		window
			.matchMedia("(orientation: landscape)")
			.addEventListener("change", (e) => {
				isLandscape = e.matches;
			});
	});
</script>

<div class="top-bar">
	<a href={`${base}/activities`}>Go to activities page</a>
	<button class="mute" on:click={mute}>{$soundOn ? "Mute" : "Unmute"}</button>
	<Toggle label="Text Version" style="inner" bind:value={toggleValue} />
</div>

{#if toggleValue === "on"}
	<Plain />
{:else if askToRotate}
	<Rotate />
{/if}

<!-- {#if loading}
	<Loading />
{:else} -->

<!-- remember, story always has to be rendering -->
<Story {innerHeight} />

<!-- {/if} -->

<svelte:window bind:innerHeight />

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
