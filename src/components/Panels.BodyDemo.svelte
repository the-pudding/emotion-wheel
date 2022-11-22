<script>
	import { currentPanel } from "$stores/misc.js";

	export let i;
</script>

<img
	class="body-diagram"
	class:visible={$currentPanel === i}
	src={`assets/img/body_demo_annotated.png`}
/>

<style>
	img.body-diagram {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 30%;
		height: auto;
		transform: translate(0, -50%);
	}
</style>
