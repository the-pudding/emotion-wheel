<script>
	import { currentPanel } from "$stores/misc.js";

	export let i;
</script>

<img class="body-diagram visible" src={`assets/img/blank_body_cloud.png`} />
<img
	class="body-diagram"
	class:visible={$currentPanel === i}
	src={`assets/img/abby_body_drawing.png`}
/>

<style>
	img.body-diagram {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 30%;
		height: auto;
		transform: translate(0, -50%);
		opacity: 0;
		transition: opacity 2s;
		transition-delay: 2s;
	}
	.body-diagram.visible {
		opacity: 1;
	}
</style>
