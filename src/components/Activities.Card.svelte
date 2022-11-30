<script>
	import { base } from "$app/paths";

	export let imageSrc;
	export let title;
	export let currentActivity;

	const onClick = () => {
		currentActivity = imageSrc;
	};
</script>

<button
	class="card"
	id={imageSrc}
	style={`--background: url(${base}/assets/activities/${imageSrc}.png)`}
	on:click={onClick}
>
	<h3>{title}</h3>
</button>

<style>
	.card {
		background: none;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		aspect-ratio: 1 / 1;
		position: relative;
		padding: 1em;
		opacity: 1;
		transition: all calc(var(--1s) * 0.5);
	}
	.card:before {
		content: "";
		background-image: var(--background);
		flex-grow: 1;
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		opacity: 0.3;
	}
	.card:hover {
		background: var(--color-gray-300);
		cursor: pointer;
	}
	h3 {
		text-align: center;
	}
	#wheel:before {
		background-position: center;
		background-size: 300%;
	}
	#body:before {
		background-position: top;
		background-size: 100%;
	}
	#needs:before {
		background-position: right;
		background-size: 200%;
	}
</style>
