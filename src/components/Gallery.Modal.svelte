<script>
	import Modal from "$components/Modal.svelte";
	import ZoomableImage from "$components/ZoomableImage.svelte";
	import { zoomModalImage } from "$stores/misc.js";
	import copy from "$data/copy.json";

	$: visible = $zoomModalImage;
	$: comments = copy.gallery.find(
		(d) => `gallery/${d.id}` === $zoomModalImage
	)?.comments;
</script>

<Modal {visible} big={true}>
	<ZoomableImage
		src={$zoomModalImage ? `assets/img/${$zoomModalImage}` : null}
		comments={comments ? comments : []}
	/>
</Modal>
