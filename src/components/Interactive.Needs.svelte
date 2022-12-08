<script>
	import { base } from "$app/paths";
	import { Howl } from "howler";
	import NeedsChecklist from "$components/NeedsChecklist.svelte";
	import Button from "$components/Button.svelte";
	import { needs, soundOn } from "$stores/misc.js";
	import needsChecks from "$svg/needs.svg";

	export let text;

	let skipBtn;
	const sound = new Howl({
		src: [`${base}/assets/sound/select.wav`],
		volume: 0.3
	});

	$: disabled = $needs.length > 0;
	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	const skip = () => {
		sound.play();
		$needs = [""];
	};
</script>

<NeedsChecklist
	checks={needsChecks}
	wheelId={"needs"}
	bind:selected={$needs}
	limit={5}
	nextSelectable={skipBtn}
/>

<Button
	bind:buttonEl={skipBtn}
	onClick={skip}
	top={"53%"}
	left={"88.5%"}
	transform={true}
	{disabled}>skip</Button
>

<div class="needs">
	{#each text as t}
		<p>{@html t}</p>
	{/each}
</div>

<style>
	.needs {
		position: absolute;
		left: 5%;
		top: 40%;
		transform: translate(0, -50%);
		max-width: 450px;
	}
	.needs p:nth-child(3) {
		font-size: 16px;
		margin: 0.5em 0;
	}
	button.skip {
		position: absolute;
		top: 53%;
		left: 88.5%;
		transform: translate(-50%, -50%);
	}

	@media (max-height: 800px) {
		.needs {
			max-width: 380px;
		}
	}
	@media (max-height: 600px) {
		.needs {
			max-width: 250px;
		}
	}
</style>
