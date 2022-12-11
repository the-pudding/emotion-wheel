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
	import mq from "$stores/mq.js";

	export let text;
	export let justWheel = false;

	let skipBtn;
	let moveOnEl;

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

{#if justWheel}
	<div class="just-wheel-wrapper">
		{#key $basicFeeling}
			<ClickableWheel
				slices={slices[$basicFeeling]}
				imgSrc={`assets/img/wheels/${_.kebabCase($basicFeeling)}`}
				wheelId={`${_.kebabCase($basicFeeling)}-grey`}
				bind:selected={$words}
				limit={3}
				soundId={"pop"}
				nextSelectable={!skipBtn || skipBtn.disabled ? moveOnEl : skipBtn}
			/>
		{/key}
	</div>
{:else}
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

		{#if !$mq.sm}
			{#key $basicFeeling}
				<ClickableWheel
					slices={slices[$basicFeeling]}
					imgSrc={`assets/img/wheels/${_.kebabCase($basicFeeling)}`}
					wheelId={`${_.kebabCase($basicFeeling)}-grey`}
					bind:selected={$words}
					limit={3}
					soundId={"pop"}
					nextSelectable={!skipBtn || skipBtn.disabled ? moveOnEl : skipBtn}
				/>
			{/key}
		{/if}

		<div tabindex="-1" bind:this={moveOnEl} />
	</div>
{/if}

{#if justWheel || !$mq.sm}
	<Button
		bind:buttonEl={skipBtn}
		top={"53%"}
		left={"67.5%"}
		transform={true}
		onClick={skip}
		{disabled}>skip</Button
	>
{/if}

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
	.just-wheel-wrapper {
		height: 100%;
		display: flex;
		margin-top: 1em;
		justify-content: flex-start;
		transform: translate(-50%, 0);
	}
</style>
