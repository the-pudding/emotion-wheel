<script>
	import inView from "$actions/inView.js";
	import { fade, scale } from "svelte/transition";
	import { quintOut } from "svelte/easing";

	const rightGap = 15;

	let zoomed = false;
	const zoom = () => {
		zoomed = true;
	};
</script>

{#if !zoomed}
	<div
		class="scaler"
		transition:scale={{
			start: 2.5,
			duration: 4000,
			opacity: 1,
			easing: quintOut
		}}
	>
		<div
			class="title"
			style={`width: ${100 + rightGap}vw; background-position-x: ${
				-1 * rightGap
			}vw`}
		>
			<div
				class="words"
				transition:fade
				style={`transform: translate(-${rightGap}%, -50%)`}
			>
				<h1>How are you feeling?</h1>
				<div>By Abby VanMujien and Michelle McGhee</div>
				<div class="scroll">Scroll to continue -></div>
			</div>
		</div>

		<div
			class="spacer"
			use:inView
			on:enter={zoom}
			style={`width: ${rightGap - 2}vw`}
		/>
	</div>
{/if}

<style>
	.scaler {
		position: relative;
		transition: transform 3s;
		transform: scale(1);
	}

	.title {
		height: 100vh;
		background: url("assets/img/notebook.jpeg") no-repeat center center fixed;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;

		display: flex;
		flex-shrink: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.words {
		position: fixed;
		top: 50%;
	}
	h1 {
		font-size: 3em;
		font-family: var(--font-titles);
		font-weight: bold;
	}
	.scroll {
		margin-top: 3em;
	}
	.spacer {
		height: 100vh;
		flex-shrink: 0;
		position: absolute;
		right: 0;
		top: 0;
		background: grey;
		opacity: 0.3;
	}
</style>
