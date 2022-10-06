<script>
	export let i;
	export let balloonColor;

	let basicFeeling;
	let words = [
		"calm",
		"creative",
		"frustrated",
		"guilty",
		"nervous",
		"tired",
		"overwhelmed",
		"lonely",
		"grateful",
		"pissed off",
		"curious",
		"self-conscious"
	];
	let selectedWords = [];
	let wordsSelected1 = false;
	let wordsSelected2 = false;
	let selectedColor;

	const onClick = (e) => {
		basicFeeling = e.target.id;
	};
	const onClickColor = (e) => {
		selectedColor = e.target.id;
		balloonColor = "purple";
	};
</script>

{#if i === 0}
	<div class="words">
		<p>Hi, how are you doing?</p>
		<button on:click={onClick} id="ok">ok</button>
		<button on:click={onClick} id="good">good</button>
		<button on:click={onClick} id="busy">busy</button>
		{#if basicFeeling}
			<p>Here's how everyone is doing...</p>
		{/if}
	</div>
{:else if i === 1}
	<div class="words">
		<p>
			A few years ago, when someone would ask me how I was doing, I would almost
			always respond with one of these 3 options.
		</p>
		<p>I didn't think there was much more to say.</p>
	</div>
{:else if i === 2}
	<div class="words">
		<p>But then that started to change.</p>
	</div>
{:else if i === 3}
	<div class="words">
		<p>
			Feelings I had never noticed before (or maybe just avoided) started to say
			WE ARE NOT OKAY.
		</p>
		<p>
			And started to manifest in the form of panic attacks, self harm,
			depression & anxiety.
		</p>
	</div>
{:else if i === 4}
	<div class="words">
		<p>
			So I got my butt into therapy (where they don't let you off the hook with
			answers like this...).
		</p>
	</div>
	<img src="assets/img/therapy.png" />
{:else if i === 5}
	<div class="words">
		<p>
			My thrapist suggested I use a feelings wheel to help improve my "emotional
			vocabulary."
		</p>
		<p>
			I could choose words from the wheel to be more specific about how I was
			feeling and give that feeling a name.
		</p>
	</div>
	<img src="assets/img/wheel_grey.png" />
{:else if i === 6}
	<div class="words">
		<p>Here, you try...</p>
		<p>How are you doing?</p>
		{#each words.slice(0, 6) as word}
			<label>
				<input
					type="checkbox"
					bind:group={selectedWords}
					name="words"
					value={word}
				/>
				{word}
			</label>
		{/each}
		<button on:click={() => (wordsSelected1 = true)} class="continue"
			>Continue</button
		>

		{#if wordsSelected1}
			<p>Ok, one more:</p>
			{#each words.slice(6) as word}
				<label>
					<input
						type="checkbox"
						bind:group={selectedWords}
						name="words"
						value={word}
					/>
					{word}
				</label>
			{/each}
			<button on:click={() => (wordsSelected2 = true)} class="continue"
				>Continue</button
			>
		{/if}

		{#if wordsSelected2}
			<p>Here's how everyone is doing...</p>
		{/if}
	</div>
{:else if i === 7}
	<div class="words">
		<p>
			This kind of specificity of emotional vocabulary is what Susan David calls <a
				href="https://resources.soundstrue.com/transcript/susan-david-emotional-agility/"
				target="_blank">"emotional granularity."</a
			> When we can identify what we're feeling, we can identify what our body is
			telling us it needs. Pretty cool, eh?
		</p>
	</div>
{:else if i === 8}
	<div class="words">
		<p>
			The other thing I thought was interesting about the wheel was that it
			organized the feelings by color and category. Although I didn't quite like
			the colors and categories on the wheels I found...
		</p>
		<p>
			Colors can have very strong emotional associations - but they're different
			for everyone.
		</p>
	</div>
{:else if i === 9}
	<div class="words">
		<p>You're feeling <strong>guilty</strong> - what color is it?</p>
		<div class="swatches">
			<div
				class="swatch"
				style={`background-color: red`}
				id="red"
				on:click={() => (selectedColor = "red")}
			/>
			<div class="swatch" id="yellow" on:click={onClickColor} />
			<div class="swatch" id="purple" on:click={onClickColor} />
			<div class="swatch" id="orange" on:click={onClickColor} />
			<div class="swatch" id="green" on:click={onClickColor} />
			<div class="swatch" id="blue" on:click={onClickColor} />
		</div>
	</div>
{/if}

<style>
	.words {
		position: absolute;
		top: 40%;
		left: 30%;
		max-width: 500px;
		visibility: visible;
	}
	img {
		visibility: visible;
		position: absolute;
		bottom: 0;
	}
	input {
		appearance: auto;
	}
	button.continue {
		display: block;
	}
	.swatches {
		display: flex;
	}
	.swatch {
		height: 50px;
		width: 50px;
	}
	.swatch:hover {
		cursor: pointer;
	}
	#red {
		background: red;
	}
	#yellow {
		background: yellow;
	}
	#green {
		background: green;
	}
	#blue {
		background: blue;
	}
	#purple {
		background: purple;
	}
	#orange {
		background: orange;
	}
</style>
