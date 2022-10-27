<script>
	import { selectedGalleryImage } from "$stores/misc.js";

	export let img;
	export let title;

	let hovering = false;

	const onClick = () => {
		$selectedGalleryImage = img;
	};
</script>

<div
	class="card"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	on:click={onClick}
>
	<img src={`assets/img/${img}`} class:faded={hovering} />

	{#if hovering}
		<div class="title">{title}</div>
	{/if}
</div>

<style>
	.card {
		position: relative;
		align-items: center;
		justify-content: center;
		display: flex;
	}
	img {
		transition: opacity 500ms;
	}
	img.faded {
		opacity: 0.3;
	}
	.card:hover {
		cursor: pointer;
	}
	.title {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
