<script>
</script>

<div class="container">
	<div class="top">
		<h1>Activities</h1>
		<a href={`../`}>Go back to story</a>
	</div>

	<div class="sections">
		<div class="section">
			<h3>Emotion wheel</h3>
			<img src="../assets/activities/wheel.png" />
		</div>
		<div class="section">
			<h3>Body mapping</h3>
			<img src="../assets/activities/blank_body.png" />
		</div>
		<div class="section">
			<h3>Needs checklist</h3>
			<img src="../assets/activities/checklist_placeholder.png" />
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100vh;
		padding: 2em;
		background: white;
	}
	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		margin-bottom: 2em;
	}
	.top h1 {
		margin-bottom: 0;
	}
	.sections {
		display: flex;
	}
	.section {
		flex-basis: 33%;
		height: 500px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	img {
		max-height: 100%;
	}
</style>
