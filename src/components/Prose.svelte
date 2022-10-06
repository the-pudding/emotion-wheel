<script>
	import { range } from "d3";

	export let i;
	export let balloonColor;
	export let scrollValue;

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
	let showGenius = false;

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
		<p>
			You're feeling <strong>guilty</strong> - what color is it? (pick purple)
		</p>
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
{:else if i === 10}
	<div class="words">
		<p>
			I started to do this every day - I'd write the words I was feeling and the
			color I associated with that feeling...
		</p>
	</div>
	<img src="assets/img/word_blocks.png" style:bottom={"1em"} />
{:else if i === 11}
	<div class="words">
		<p>
			I found a lot of my associations lined up with the colors & character
			designs from "Inside Out" - and studied their process.
		</p>
	</div>
	<img
		src="assets/img/inside_out.png"
		style:left={"20%"}
		style:height={"200px"}
		style:bottom={"15em"}
	/>
{:else if i === 12}
	<div class="words">
		<p>
			It turns out, most scientists agree, there are at least 5 core emotions
			that track back to the way our bodies intuitively communicate our needs
			before we have language.
		</p>
	</div>
	<img
		src="assets/img/inside_out_details.png"
		style:left={"20%"}
		style:height={"240px"}
		style:bottom={"13em"}
	/>
{:else if i === 13}
	<div class="words">
		<p>
			So I kept up my practice - and started to also track how each feeling
			showed up in my body and facial expressions.
		</p>
		<p>
			I found some patterns in how the colors I was using lined up with how &
			where the feelings showed up in my body.
		</p>
	</div>
	<img
		src="assets/img/body.png"
		style:height={"350px"}
		style:left={"20%"}
		style:bottom={"3em"}
	/>
	<button
		style={`position: absolute;
    right: 0;
    bottom: 4em;
    visibility: visible;`}
		on:click={() => (showGenius = !showGenius)}>What's "genius"?</button
	>
	{#if showGenius}
		<p class="genius-modal">
			I made a new category! There was a set of words that was close to joy, but
			had a different, more active energy to them. Joy to me, was a category of
			feelings ascribed to the experience of having the felt sense of satisfied
			needs. These other words had a need attached to them - the need to express
			ones authentic self. I call this category <span style="background: orange"
				>genius</span
			>.
		</p>
	{/if}
{:else if i === 14}
	<div class="words">
		<p>
			Ok, so that's how feelings show up in my body/nervous system... how do
			they show up in yours?
		</p>
		<p>Where do you feel <strong>frustration</strong>?</p>
	</div>
	<img src="assets/img/draw_body.png" style:left={"20%"} />
{:else if i === 15}
	<div class="words">
		<p>
			Brené Brown says there are as many theories on emotions as there are
			emotions researchers - which seems right to me.
		</p>
		<p>
			And while I'm more of an artist than a researcher, this work has helped me
			very deeply.
		</p>
	</div>
{:else if i === 16}
	<div class="words">
		<p>
			I ended up turning all of this into my own emotion wheel, and have used
			the <strong>words</strong>, the <strong>colors</strong>, and the
			<strong>somatic mapping</strong> to build a more visual vocabulary to understand
			and express how I'm doing each day and what I maybe needing to experience more
			joy (satisfied needs) in my life.
		</p>
	</div>
	<img
		src="assets/img/emotion_wheel.png"
		style:left={"35%"}
		style:height={"400px"}
		style:bottom={"3em"}
	/>
{:else if i === 17}
	<img
		class="notebook"
		src="assets/img/the_things.png"
		class:visible={scrollValue !== 17}
	/>
	<img
		class="notebook"
		src="assets/img/the_things_color.png"
		class:visible={scrollValue === 17}
	/>
{:else if i === 18}
	{#each range(6) as d}
		<img
			class="notebook"
			src={`assets/img/george_floyd_${d + 1}.png`}
			class:visible={scrollValue === 18}
			style={`transition: opacity 3s ${d * 600}ms`}
		/>
	{/each}
{:else if i === 19}
	<div class="words">
		<p>
			I started to expore my gender identity and expression (I'm trans turns
			out...)
		</p>
	</div>
	<img
		class="notebook"
		src={`assets/img/dress.png`}
		class:visible={scrollValue === 19}
		style:height={"500px"}
	/>
	<img
		class="notebook"
		src={`assets/img/suit.png`}
		class:visible={scrollValue === 19}
		style:height={"500px"}
		style:left={"40%"}
	/>
{:else if i === 20}
	<div class="words">
		<p>
			I started using new pronouns, and expressiong myself and my gender more
			authentically.
		</p>
	</div>
	<img
		class="notebook"
		src={`assets/img/pronouns.png`}
		class:visible={scrollValue === 20}
	/>
{:else if i === 21}
	<div class="words">
		<p>I used it to make sense of tough moments in my family.</p>
	</div>
	<img
		class="notebook"
		src={`assets/img/family.png`}
		class:visible={scrollValue === 21}
	/>
{:else if i === 22}
	<div class="words">
		<p>I had a lot more panic attacks...</p>
	</div>
	<img
		class="notebook"
		src={`assets/img/panic_attack.png`}
		style:height={"600px"}
		class:visible={scrollValue === 22}
	/>
{:else if i === 23}
	<div class="words">
		<p>
			In difficult moments, I had learned how to pause... and ask what word is
			this? What color is this? Where is which feelings manifesting? What is my
			body telling me it needs?
		</p>
	</div>
	<img
		src={"assets/img/ending_1.png"}
		style:height={"300px"}
		style:bottom={"3em"}
		style:left={"30%"}
	/>
{:else if i === 24}
	<img
		src={"assets/img/ending_2.png"}
		style:height={"300px"}
		style:bottom={"3em"}
		style:left={"30%"}
	/>
{:else if i === 25}
	<div class="words">
		<p>
			When I can identify my feelings, I can identify my needs. When I can
			identify my needs, I can take care of myself or ask those who care for me
			to help.
		</p>
	</div>
	<img
		src={"assets/img/ending_3.png"}
		style:height={"300px"}
		style:bottom={"3em"}
		style:left={"30%"}
	/>
{:else if i === 26}
	<div class="words">
		<p>Final thought, still tbd.</p>
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
	}
	img.notebook {
		opacity: 0;
		transition: opacity 3s;
	}
	img.visible.notebook {
		opacity: 1;
	}
	img:not(.notebook) {
		bottom: 0;
		max-height: 500px;
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
	.swatch:not(#purple) {
		opacity: 0.2;
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
	.genius-modal {
		background: white;
		position: absolute;
		right: 0;
		visibility: visible;
		bottom: 7em;
		width: 200px;
		z-index: 10;
		padding: 0.5em;
	}
</style>
