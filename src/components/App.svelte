<script>
	import Title from "$components/Title.svelte";
	import Content from "$components/Content.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Character from "$components/Character.svelte";
	import copy from "$data/copy.json";
	import { entered } from "$stores/misc.js";

	let userId; // store
	let containerEl;
	let value;
	let balloonColor = "grey";

	let scrolled = 0;
	const scrollMax = 400;
	$: $entered = scrolled >= scrollMax;

	const onMouseWheel = (e) => {
		const leaving = $entered && containerEl.scrollLeft === 0 && e.deltaY < 0;
		if (!$entered || leaving) {
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
	<Title {scrolled} {scrollMax} />

	{#if $entered}
		<Character scrollLeft={containerEl ? containerEl.scrollLeft : 0} />

		<Scrolly bind:value>
			{#each copy.steps as step}
				<div class="step" class:hidden={true}>
					<!-- <img
						src="assets/img/testpanel.jpg"
						class="full-panel"
						transition:fade
					/> -->
					<Content {step} bind:balloonColor scrollValue={value} bind:userId />
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

	.step {
		position: relative;
		margin: 0;
		display: flex;
		align-items: center;
		flex-shrink: 0;

		/* comment these out when you bring back full-panel*/
		height: 100vh;
		width: 100vw;
	}
	.hidden {
		visibility: hidden;
	}

	.full-panel {
		visibility: visible;
		height: 100vh;
		max-width: none;
	}
</style>
