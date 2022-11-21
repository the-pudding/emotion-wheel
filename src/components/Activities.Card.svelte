<script>
	export let imageSrc;
	export let title;
	export let currentActivity;

	$: console.log({ currentActivity });

	const onClick = () => {
		currentActivity = imageSrc;
	};
</script>

<div
	class="card"
	id={imageSrc}
	style={`--background: url(../assets/activities/${imageSrc}.png`}
	on:click={onClick}
>
	<h3>{title}</h3>
</div>

<style>
	.card {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		aspect-ratio: 1 / 1;
		position: relative;
		padding: 1em;
		opacity: 1;
		transition: all 500ms;
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
		background-position: left;
		background-size: 200%;
	}
</style>
