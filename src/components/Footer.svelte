<script>
	import { onMount } from "svelte";
	import wordmark from "$svg/wordmark.svg";

	let localURL;
	let stories = [];

	const v = Date.now();
	const url = `https://pudding.cool/assets/data/stories.json?v=${v}`;

	const links = [
		{ name: "about", url: "https://pudding.cool/about" },
		{ name: "facebook", url: "https://facebook.com/pudding.viz/" },
		{ name: "twitter", url: "https://twitter.com/puddingviz/" },
		{
			name: "instagram",
			url: "https://www.instagram.com/the.pudding"
		},
		{ name: "patreon", url: "https://patreon.com/thepudding/" },
		{ name: "privacy", url: "https://pudding.cool/privacy/" },
		{ name: "newsletter", url: "https://thepuddingmail.substack.com" },
		{ name: "rss", url: "https://pudding.cool/feed/index.xml" }
	];

	onMount(async () => {
		localURL = window.location.href;
		const response = await fetch(url);
		const data = await response.json();
		stories = data.filter((d) => !localURL.includes(d.url)).slice(0, 4);
	});
</script>

<footer>
	<section class="stories">
		{#each stories as { hed, url, image }}
			<div class="story">
				<a href="https://pudding.cool/{url}">
					<img
						src="https://pudding.cool/common/assets/thumbnails/640/{image}.jpg"
						alt="thumbnail"
					/>
					<span>{hed}</span>
				</a>
			</div>
		{/each}
	</section>

	<section class="about">
		<!-- <div class="wordmark">
			{@html wordmark}
		</div> -->
		<p>
			<a href="https://pudding.cool">The Pudding</a>
			is a digital publication that explains ideas debated in culture with visual
			essays.
		</p>
	</section>

	<section class="links">
		<ul>
			{#each links as link}
				<li>
					<a href={link.url}>
						<span>{link.name.toUpperCase()}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</footer>

<style>
	footer {
		color: var(--color-fg);
		margin-top: 6em;
		position: absolute;
		top: 0;
		width: 100%;
		height: 90%;
	}

	.stories {
		margin: 0 auto;
		display: flex;
		max-height: 50%;
	}

	.story {
		display: block;
		height: 100%;
		border: none;
		margin-bottom: 3rem;
		margin-right: 0.5em;
		margin-left: 0.5em;
	}

	.story a {
		display: block;
		font-weight: 700;
		text-decoration: none;
	}

	.story span {
		display: block;
		margin-top: 1em;
		line-height: 1.2;
		text-align: center;
	}

	.wordmark {
		max-width: 10em;
		margin: 1em auto;
	}

	.about {
		margin: 3rem auto;
		margin-top: 0;
		text-align: center;
	}

	.links ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.links li {
		display: flex;
		padding: 0.5em 1em;
	}

	.links a {
		display: flex;
		border: none;
		align-items: center;
		text-decoration: none;
	}

	.links span {
		margin-left: 0.5em;
	}

	@media (max-height: 600px) {
		footer {
			margin-top: 3em;
		}
		.story {
			margin-bottom: 1rem;
		}
		.about {
			margin: 1rem auto;
		}
	}
</style>
