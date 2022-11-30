<script>
	import { base } from "$app/paths";
	import { entered, showPlain } from "$stores/misc.js";

	let src = `${base}/assets/img/logo_small.png`;
</script>

<header class:plain={$showPlain} class="wordmark">
	<a href="https://pudding.cool" aria-label="The Pudding" target="_blank">
		<img {src} class:visible={$entered} alt="pudding logo" />
	</a>
</header>

<style>
	header {
		position: fixed;
		z-index: 1;
	}
	header.plain {
		position: static;
		display: flex;
		justify-content: center;
	}

	img {
		height: 3.5em;
		margin: 1em 0 0 1em;
		opacity: 0;
		transition: opacity var(--1s);
	}
	img.visible {
		opacity: 1;
	}

	.wordmark {
		max-width: 10em;
		margin: 0 auto;
		padding: 1em 0;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	:global(.wordmark svg path) {
		fill: currentColor;
	}

	@media (hover: hover) and (pointer: fine) {
		img {
			height: 5em;
		}
	}
</style>
