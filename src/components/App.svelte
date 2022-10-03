<script>
	let containerEl;

	const onMouseWheel = (e) => {
		containerEl.scrollLeft += e.deltaY;
	};
</script>

<div
	class="container"
	bind:this={containerEl}
	on:mousewheel|preventDefault={onMouseWheel}
>
	<img class="character" src="assets/img/character.jpeg" />
	<div class="ground" />

	{#each [1, 2, 3, 4, 5] as i}
		<p class="step" class:hidden={true}>This is step {i}</p>
	{/each}

	<p>Here is some text that might appear as we journey along.</p>
</div>

<style>
	.container {
		position: relative;
		overflow-x: hidden;
		display: flex;
		align-items: flex-end;
		height: 50vh;
		background: lightblue;
	}

	.character {
		height: 150px;
		position: sticky;
		left: 3em;
		bottom: 2em;
	}

	.ground {
		position: absolute;
		bottom: 0;
		background-image: url("assets/img/background.jpeg");
		background-repeat: repeat-x;
		height: 2em;
		width: 600%;
	}

	.step {
		margin: 0;
		display: flex;
		align-items: center;
		height: 100%;
		width: 100vh;
		flex-shrink: 0;
		background: lightblue;
		border: 1px solid grey;
	}
	.step:nth-child(even) {
		background: lightgoldenrodyellow;
	}
	.hidden {
		visibility: hidden;
	}
</style>
