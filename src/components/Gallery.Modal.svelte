<script>
	import Modal from "$components/Modal.svelte";
	import ZoomableImage from "$components/ZoomableImage.svelte";
	import { zoomModalImage } from "$stores/misc.js";
	import copy from "$data/copy.json";

	$: visible = $zoomModalImage;
	$: comments = copy.gallery.filter((d) => d.id === $zoomModalImage)[0]
		? copy.gallery.filter((d) => d.id === $zoomModalImage)[0].comments
		: [];
</script>

<Modal {visible} big={true}>
	<ZoomableImage
		src={$zoomModalImage ? `assets/img/${$zoomModalImage}` : null}
		{comments}
	/>
</Modal>
