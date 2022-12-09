<script>
	import { base } from "$app/paths";
	import ClickableWheel from "$components/ClickableWheel.svelte";
	import Button from "$components/Button.svelte";
	import { basicFeeling, words, soundOn } from "$stores/misc.js";
	import _ from "lodash";
	import { onDestroy } from "svelte";
	import { Howl } from "howler";
	import okaySlices from "$svg/okay.svg";
	import goodSlices from "$svg/good.svg";
	import notGreatSlices from "$svg/not-great.svg";
	import busySlices from "$svg/busy.svg";
	import { annotate } from "svelte-rough-notation";
	import variables from "$data/variables.json";

	export let text;

	let skipBtn;
	let calloutEl;

	$: if (!$soundOn) sound.mute(true);
	$: if ($soundOn) sound.mute(false);

	const sound = new Howl({
		src: [`${base}/assets/sound/select.wav`],
		volume: 0.3
	});

	const slices = {
		okay: okaySlices,
		good: goodSlices,
		"not great": notGreatSlices,
		busy: busySlices
	};

	$: disabled = $words.length > 0;

	const skip = () => {
		sound.play();
		$words = [$basicFeeling];
	};

	onDestroy(() => {
		sound.unload();
	});
</script>

<div class="words">
	<div>
		Here you try... what do you mean by<br /><span
			use:annotate={{
				type: "highlight",
				animate: false,
				visible: true,
				color: variables.color["grey-balloon"]
			}}>{$basicFeeling}?</span
		>
	</div>
	{#each text as t, i}
		<div>{@html t}</div>
	{/each}

	{#key $basicFeeling}
		<ClickableWheel
			slices={slices[$basicFeeling]}
			imgSrc={`assets/img/wheels/${_.kebabCase($basicFeeling)}`}
			wheelId={`${_.kebabCase($basicFeeling)}-grey`}
			bind:selected={$words}
			limit={3}
			soundId={"pop"}
			nextSelectable={!skipBtn || skipBtn.disabled ? calloutEl : skipBtn}
		/>
	{/key}
</div>

<Button
	bind:buttonEl={skipBtn}
	top={"53%"}
	left={"67.5%"}
	transform={true}
	onClick={skip}
	{disabled}>skip</Button
>

<style>
	.words {
		margin-left: 20%;
		width: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.words div:nth-child(2) {
		font-size: 16px;
		margin: 0.5em 0;
	}
	.words div {
		text-align: center;
	}
	span {
		font-size: 1.6em;
		font-weight: bold;
	}
</style>
