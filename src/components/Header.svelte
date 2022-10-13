<script>
	import wordmark from "$svg/wordmark.svg";
</script>

<header>
	<img src="assets/img/logo_small.png" />
	<!-- <div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
	</div> -->
</header>

<style>
	header {
		position: fixed;
		z-index: 1;
	}
	img {
		height: 4em;
		margin: 1em 0 0 1em;
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
