<script>
	let width;
	let height;
</script>

<div bind:clientHeight={height} bind:clientWidth={width}>
	<img src="../assets/wheel/emotion_wheel.png" />
	<svg {height} {width}>
		<ellipse
			cx={width / 2 + 3}
			cy={height / 2 + 7}
			rx={90}
			ry={89}
			fill="red"
			opacity={0.6}
		/>

		<ellipse
			cx={width / 2 + 5}
			cy={height / 2 + 4}
			rx={218}
			ry={215}
			fill="green"
			opacity={0.6}
		/>

		<ellipse
			cx={width / 2 + 4}
			cy={height / 2 - 3}
			rx={340}
			ry={328}
			fill="purple"
			opacity={0.6}
		/>
	</svg>
</div>

<style>
	div {
		position: relative;
	}
	img {
		max-width: 100vw;
		max-height: 100vh;
	}
	svg {
		position: absolute;
		top: 0;
	}
</style>
