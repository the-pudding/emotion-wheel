<script>
	import wordmark from "$svg/wordmark.svg";
	import { entered } from "$stores/misc.js";
</script>

<header>
	<a href="https://pudding.cool" aria-label="The Pudding" target="_blank">
		<!-- <img src="assets/img/logo_small.png" class:visible={$entered} /> -->
	</a>
</header>

<style>
	header {
		position: fixed;
		z-index: 1;
	}
	img {
		height: 3em;
		margin: 1em 0 0 1em;
		opacity: 0;
		transition: opacity 1s;
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
</style>
