<script>
	import Wheel from "$components/Activities.Wheel.svelte";
	import Body from "$components/Activities.Body.svelte";
	import Needs from "$components/Activities.Needs.svelte";
	import Modal from "$components/Modal.svelte";
	import { toPng } from "html-to-image";

	export let currentActivity;
	export let words;
	export let bodyImage;
	export let needs;

	let closeBtn;
	let screenshotEl;

	const screenshot = async () => {
		let png = await toPng(screenshotEl);
		let img = new Image();
		img.src = png;
		bodyImage = img;
	};

	const close = async () => {
		if (currentActivity === "body") await screenshot();
		currentActivity = undefined;
	};
</script>

<Modal visible={currentActivity} big={true} bind:closeBtn on:close={close}>
	{#if currentActivity === "wheel"}
		<Wheel bind:words {closeBtn} />
	{:else if currentActivity === "body"}
		<Body bind:screenshotEl />
	{:else if currentActivity === "needs"}
		<Needs bind:needs {closeBtn} />
	{/if}
</Modal>
