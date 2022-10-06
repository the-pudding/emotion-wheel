<script>
	import Prose from "$components/Prose.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { range } from "d3";

	let containerEl;
	let value;
	let balloonColor = "grey";

	$: console.log({ value });

	$: backgroundColor =
		value === undefined || value < 2 || (value >= 6 && value < 10)
			? "white"
			: value >= 2 && value < 10
			? "lightgrey"
			: "#e2f4f9";

	const stepText = ["How are you feeling?"];

	const onMouseWheel = (e) => {
		containerEl.scrollLeft += e.deltaY;
	};
</script>

<div
	class="container"
	bind:this={containerEl}
	on:mousewheel|preventDefault={onMouseWheel}
	style={`background: ${backgroundColor}`}
>
	<div class="title">
		<h1>How are you feeling?</h1>
		<div>By Abby VanMujien and Michelle McGhee</div>
		<div style="margin-top: 3em">Scroll to continue -></div>
	</div>

	<img class="character" src={`assets/img/character_${balloonColor}.png`} />

	<div
		class="background"
		style={`--bg: url(../../../assets/img/background_plain.png)`}
		style:width={"400%"}
	/>
	<div
		class="background"
		style={`--bg: url(../../../assets/img/background_tree.png)`}
		style:left={"400%"}
		style:width={"100%"}
	/>
	<div
		class="background"
		style={`--bg: url(../../../assets/img/background_plain.png)`}
		style:left={"500%"}
		style:width={"2500%"}
	/>

	<Scrolly bind:value>
		{#each range(30) as i}
			<div class="step" class:hidden={true}>
				<Prose {i} bind:balloonColor scrollValue={value} />
			</div>
		{/each}
	</Scrolly>
</div>

<style>
	h1 {
		font-size: 4em;
		font-family: var(--font-titles);
		font-weight: bold;
	}
	.container {
		position: relative;
		overflow-x: hidden;
		display: flex;
		align-items: flex-end;
		height: 100vh;
		transition: background 1s;
	}

	.title {
		width: 100vw;
		color: black;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		flex-shrink: 0;
		align-self: center;
	}

	.character {
		height: 150px;
		position: sticky;
		left: 3em;
		bottom: 2em;
		z-index: 1;
	}

	.background {
		position: absolute;
		bottom: 0;
		background-image: var(--bg);
		background-repeat: repeat-x;
		height: 450px; /* height of image */
	}

	.step {
		position: relative;
		margin: 0;
		display: flex;
		align-items: center;
		height: 100vh;
		width: 100vw;
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
