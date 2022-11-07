<script>
	import inView from "$actions/inView.js";

	export let text;

	let visible = false;
</script>

<div
	class="words"
	class:visible
	use:inView
	on:enter={() => (visible = true)}
	on:exit={() => (visible = false)}
>
	{#each text as t}
		<p>{@html t}</p>
	{/each}
</div>

<style>
	.words {
		position: absolute;
		top: 24%;
		left: 5%;
		max-width: 500px;
		opacity: 0;
		transform: translateX(100px);
		transition: transform 1s 300ms, opacity 1s 300ms;
	}
	.visible {
		opacity: 1;
		transform: translateX(0);
	}
</style>
