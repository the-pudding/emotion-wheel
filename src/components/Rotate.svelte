<script>
	import wordmark from "$svg/wordmark.svg";
	import Icon from "$components/helpers/Icon.svelte";
	import { onMount } from "svelte";

	export let visible;

	let facebookOrInstagram = false;
	let showCopied = false;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(
			"https://pudding.cool/2022/12/emotion-wheel/"
		);
		showCopied = true;

		setTimeout(() => {
			showCopied = false;
		}, 2000);
	};

	const isFbOrIg = (str) => {
		return (
			str.includes("FBAN") ||
			str.includes("FBAV") ||
			str.toLowerCase().includes("instagram")
		);
	};

	onMount(() => {
		facebookOrInstagram = isFbOrIg(window.navigator.userAgent);
	});
</script>

<div class="rotate" class:visible>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_blank"
			>{@html wordmark}</a
		>
	</div>

	<img
		class="wheel"
		srcset={`assets/img/wheels/simple_wheel_color-sm.png 500w, assets/img/wheels/simple_wheel_color-lg.png 800w`}
		sizes={`(max-width: 600px) 500px, 800px`}
		src="assets/img/wheels/simple_wheel_color-lg.png"
	/>

	<h3>Please rotate your device.</h3>

	<p>This immersive experience is designed to be viewed in landscape mode.</p>

	{#if facebookOrInstagram}
		<p class="fb" on:click={copyToClipboard}>
			<Icon name="alert-triangle" />
			Facebook and Instagram don't allow you to rotate your screen in-app. Click
			here to copy the link, then go open it in your regular browser (i.e. Safari
			or Chrome).
		</p>

		<p class="copied" class:visible={showCopied}>Link copied!</p>
	{/if}
</div>

<style>
	.wordmark {
		width: 100%;
		max-width: 10em;
		margin: 0 auto;
		padding: 1em 0;
	}
	.wordmark a {
		border: none;
		display: block;
		color: white;
	}
	.wordmark a:hover {
		background-color: transparent;
	}
	:global(.wordmark svg path) {
		fill: currentColor;
	}
	.fb {
		font-size: var(--16px);
		position: absolute;
		bottom: -1em;
		background: white;
		color: black;
		padding: 1em;
	}
	.copied {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		color: black;
		padding: 0.6em;
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.5);
	}
	.copied.visible {
		opacity: 1;
	}

	.rotate {
		z-index: 100;
		height: 100%;
		width: 100%;
		position: fixed;
		padding: 4em 2em;
		flex-direction: column;
		align-items: center;
		font-family: var(--sans);
		letter-spacing: normal;
		word-spacing: normal;
		background-color: var(--color-fg);
		color: white;
		display: none;
	}
	.rotate.visible {
		display: flex;
	}
	h3,
	p {
		text-align: center;
	}
	img.wheel {
		max-width: 300px;
		animation: spin calc(var(--1s) * 4.5) infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		70% {
			transform: rotate(-360deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
</style>
