<script>
	import Meta from "$components/Meta.svelte";

	import Activities from "$components/Activities.svelte";
	import copy from "$data/copy.json";
	import version from "$utils/version.js";

	version();

	const preloadFont = [
		"https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
		"https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
		"https://pudding.cool/assets/fonts/national/National2Web-Regular.woff2",
		"https://pudding.cool/assets/fonts/national/National2Web-Bold.woff2"
	];

	const {
		activitiesTitle,
		activitiesDescription,
		activitiesUrl,
		url,
		keywords
	} = copy;
</script>

<Meta
	title={activitiesTitle}
	description={activitiesDescription}
	baseUrl={url}
	url={activitiesUrl}
	{preloadFont}
	{keywords}
/>

<Activities />
