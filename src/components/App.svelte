<script>
	import TopBar from "$components/TopBar.svelte";
	import Loading from "$components/Loading.svelte";
	import Plain from "$components/Plain.svelte";
	import Story from "$components/Story.svelte";
	import Rotate from "$components/Rotate.svelte";
	import {
		entered,
		scrolled,
		scrollMax,
		soundOn,
		stepWidth,
		showPlain
	} from "$stores/misc.js";
	import mq from "$stores/mq.js";
	import { onMount } from "svelte";

	const ratio = 1920 / 1080;
	let innerHeight;
	let isLandscape;

	$: loading = !innerHeight;
	$: askToRotate = innerHeight && !isLandscape && !$mq.desktop;
	$: $stepWidth = innerHeight * ratio;
	$: $entered = $scrolled >= $scrollMax;

	onMount(() => {
		isLandscape = window.matchMedia("(orientation: landscape)").matches;

		window
			.matchMedia("(orientation: landscape)")
			.addEventListener("change", (e) => {
				isLandscape = e.matches;
			});
	});
</script>

<TopBar />

{#if $showPlain}
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
</style>
