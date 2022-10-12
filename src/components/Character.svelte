<script>
	import Balloon from "$components/Balloon.svelte";

	export let balloonColor;
</script>

<!-- <div class="balloon-container">
	<Balloon color={"#deddea"} />
	<Balloon color={"#8882c9"} />
	<Balloon color={"#3c7bce"} />
	<Balloon color={"#e4c410"} />
</div> -->

<img class="character" src={`assets/img/character_${balloonColor}.png`} />

<style>
	.character {
		height: 150px;
		position: sticky;
		left: 3em;
		bottom: 2em;
		z-index: 1;
	}
	.balloon-container {
		margin: 20px;
		text-align: center;
		display: flex;
		height: 500px;
	}
</style>
