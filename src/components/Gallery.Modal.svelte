<script>
	export let selected;

	const close = () => {
		selected = undefined;
	};
</script>

<div class="modal" class:visible={selected}>
	<img src={selected ? `assets/img/${selected}` : ""} />
	<div class="close" on:click={close}>x</div>
</div>

<style>
	.modal {
		max-height: 90vh;
		max-width: 90vw;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity 1s;
		background: lightblue;
		visibility: visible;
	}
	.modal.visible {
		opacity: 1;
	}
	.close {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
	}
	.close:hover {
		cursor: pointer;
	}
</style>
