<script>
	export let img;
	export let title;
	export let selected;

	let hovering = false;

	const onClick = () => {
		selected = img;
	};
</script>

<div class="card">
	<img
		src={`assets/img/${img}`}
		on:mouseenter={() => (hovering = true)}
		on:mouseleave={() => (hovering = false)}
		class:faded={hovering}
		on:click={onClick}
	/>

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
