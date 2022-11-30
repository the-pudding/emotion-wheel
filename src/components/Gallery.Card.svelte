<script>
	import { selectedGalleryImage } from "$stores/misc.js";

	export let id;
	export let title;

	let hovering = false;

	const onClick = () => {
		$selectedGalleryImage = id;
	};
</script>

<button
	class="card"
	{id}
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	on:click={onClick}
>
	<img
		src={`assets/img/gallery/${id}.png`}
		class:faded={hovering}
		alt={title}
	/>

	{#if hovering}
		<div class="title">{title}</div>
	{/if}
</button>

<style>
	.card {
		position: relative;
		align-items: center;
		justify-content: center;
		display: flex;
		background: none;
		padding: 0;
		margin: 0;
		min-width: 400px;
	}
	img {
		transition: opacity calc(var(--1s) * 0.5);
	}
	img.faded {
		opacity: 0.3;
	}
	.title {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
