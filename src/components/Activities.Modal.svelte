<script>
	export let currentActivity;

	const close = () => {
		currentActivity = undefined;
	};
</script>

<div class="modal" class:visible={currentActivity}>
	{currentActivity}
	<button on:click={close}>close</button>
</div>

<style>
	.modal {
		position: fixed;
		width: 90%;
		height: 90%;
		background: var(--color-gray-100);
		visibility: hidden;
	}
	.visible {
		visibility: visible;
	}
</style>
