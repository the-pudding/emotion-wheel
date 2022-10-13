<script>
	import Title from "$components/Title.svelte";
	import Prose from "$components/Prose.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { range } from "d3";
	import Character from "$components/Character.svelte";
	import { fade } from "svelte/transition";

	let userId; // store
	let containerEl;
	let value;
	let balloonColor = "grey";

	$: console.log({ value });

	let scrolled = 0;
	const scrollMax = 400;
	$: entered = scrolled >= scrollMax;

	const onMouseWheel = (e) => {
		const leaving = entered && containerEl.scrollLeft === 0 && e.deltaY < 0;
		if (!entered || leaving) {
			if (
				(e.deltaY > 0 && scrolled < scrollMax) ||
				(e.deltaY < 0 && scrolled >= 0)
			)
				scrolled += e.deltaY;
		} else {
			containerEl.scrollLeft += e.deltaY;
		}
	};
</script>

<div
	class="world"
	bind:this={containerEl}
	on:mousewheel|preventDefault={onMouseWheel}
>
	<Title {scrolled} {scrollMax} {entered} />

	{#if entered}
		<Character scrollLeft={containerEl ? containerEl.scrollLeft : 0} />

		<div
			class="background"
			style={`--bg: url(../../../assets/img/background_plain.png)`}
			style:width={"400%"}
			transition:fade
		/>
		<div
			class="background"
			style={`--bg: url(../../../assets/img/background_tree.png)`}
			style:left={"400%"}
			style:width={"100%"}
			transition:fade
		/>
		<div
			class="background"
			style={`--bg: url(../../../assets/img/background_plain.png)`}
			style:left={"500%"}
			style:width={"2500%"}
			transition:fade
		/>

		<Scrolly bind:value>
			{#each range(30) as i}
				<div class="step" class:hidden={true}>
					<Prose {i} bind:balloonColor scrollValue={value} bind:userId />
				</div>
			{/each}
		</Scrolly>
	{/if}
</div>

<style>
	.world {
		position: relative;
		overflow-x: hidden;
		display: flex;
		align-items: flex-end;
		height: 100vh;
		transition: background 1s;
		background: #b5bbbb;
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
