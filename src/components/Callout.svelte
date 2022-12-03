<script>
	import { annotate } from "svelte-rough-notation";
	import { base } from "$app/paths";

	export let calloutEl;
</script>

<a
	class="callout"
	use:annotate={{
		type: "box",
		animate: false,
		visible: true,
		color: "black",
		padding: 0
	}}
	href={`${base}/activities`}
	target="_blank"
	bind:this={calloutEl}
>
	If you like these activities, you can come back to them on the activities
	page. Click here to open it in a new tab.
</a>

<style>
	.callout {
		padding: 1em;
		position: absolute;
		max-width: 450px;
		top: 30%;
		left: 67.5%;
		transform: translate(-50%, -50%);
		background: white;
		text-align: center;
	}
	.callout:hover {
		background: var(--color-gray-100);
		cursor: pointer;
	}

	@media (max-height: 450px) {
		.callout {
			top: 23%;
			left: 73%;
			width: 300px;
		}
	}
</style>
