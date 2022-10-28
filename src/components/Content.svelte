<script>
	import Basic from "$components/Interactive.Basic.svelte";
	import Words from "$components/Interactive.Words.svelte";
	import Color from "$components/Interactive.Color.svelte";
	import Body from "$components/Interactive.Body.svelte";
	import Gallery from "$components/Gallery.svelte";

	export let step;

	$: ({ id, text, options } = step);
</script>

{#if id === "survey-basic"}
	<div class="words">
		<Basic options={options.split("|")} />
	</div>
{:else if id === "survey-words"}
	<div class="words">
		<Words />
	</div>
{:else if id === "survey-color"}
	<div class="words">
		<Color />
	</div>
{:else if id === "survey-body"}
	<div class="words">
		<Body />
	</div>
{:else if id === "gallery"}
	<Gallery />
{:else}
	<div class="words">
		{#each text as t}
			<p>{@html t}</p>
		{/each}
	</div>
{/if}

<style>
	.words {
		position: absolute;
		top: 24%;
		left: 5%;
		max-width: 500px;
	}
	img {
		position: absolute;
	}
	img.notebook {
		opacity: 0;
		transition: opacity 3s;
	}
	img.visible.notebook {
		opacity: 1;
	}
	img:not(.notebook) {
		bottom: 0;
		max-height: 500px;
	}
</style>
