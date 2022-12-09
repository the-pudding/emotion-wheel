<script>
	import Loading from "$components/Loading.svelte";
	import TopBar from "$components/TopBar.svelte";
	import Plain from "$components/Plain.svelte";
	import Story from "$components/Story.svelte";
	import Rotate from "$components/Rotate.svelte";
	import { stepWidth, showPlain, entered } from "$stores/misc.js";
	import mq from "$stores/mq.js";
	import { onMount } from "svelte";

	const ratio = 1920 / 1080;
	let innerWidth;
	let innerHeight;
	let isLandscape;

	$: $stepWidth = innerHeight * ratio;

	$: loadingVisible = !innerHeight;
	$: plainVisible = !loadingVisible && $showPlain;
	$: rotateVisible =
		!loadingVisible && !plainVisible && !isLandscape && !$mq.desktop;
	$: storyVisible = !loadingVisible && !rotateVisible && !plainVisible;
	$: topBarVisible = $entered && storyVisible;

	onMount(() => {
		isLandscape = window.matchMedia("(orientation: landscape)").matches;

		window
			.matchMedia("(orientation: landscape)")
			.addEventListener("change", (e) => {
				isLandscape = e.matches;
			});
	});
</script>

<!-- <Loading visible={loadingVisible} />

<Rotate visible={rotateVisible} /> -->

<Story {innerWidth} {innerHeight} visible={storyVisible} />

<!-- <Plain visible={plainVisible} />

<TopBar visible={topBarVisible} /> -->

<svelte:window bind:innerHeight bind:innerWidth />
